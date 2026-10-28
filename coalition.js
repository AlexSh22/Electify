// Election results view and coalition builder. Reads window.ELECTION_DATA (party
// names/colors) and window.ELECTION_RESULTS (seats, vetoes). Re-renders on "langchange".
(() => {
  const D = window.ELECTION_DATA;
  const R = window.ELECTION_RESULTS;
  const SVGNS = "http://www.w3.org/2000/svg";
  const MAJORITY = 61;
  // Left-to-right seating order for the hemicycle.
  const ORDER = ["joint_list", "raam", "democrats", "yashar", "together", "yisrael_beytenu", "likud", "shas", "utj", "rz_zehut", "otzma"];

  const T = {
    he: {
      counted: (p) => `נספרו ${p}% מהקולות`,
      asOf: "נכון ל־",
      final: "תוצאות סופיות",
      source: "מקור",
      official: "לאתר ועדת הבחירות",
      seats: "מנדטים",
      threshold: "לא עברו את אחוז החסימה",
      blocs: "גושים",
      bloc: { nbloc: "גוש נתניהו", change: "גוש איזנקוט", arab: "מפלגות ערביות" },
      total: (n) => `${n} מנדטים`,
      missing: (n) => `חסרים ${n} לרוב`,
      majority: (n) => `יש רוב! ${n - 60}+`,
      noWarnings: "לא מצאנו הצהרות פומביות נגד השילוב הזה. זה עדיין לא אומר שהוא יקום.",
      firm: "הצהירו: לא נשב",
      unlikely: "לא סביר",
      note: "לתשומת לב",
      pickHint: "בחרו מפלגות כדי להרכיב קואליציה",
      waText: (names, n) => `הרכבתי קואליציה של ${n} מנדטים: ${names}. נסו לבנות משלכם ב-Electify 🗳️`,
      copied: "הקישור הועתק",
      conflicts: (f, u) => `⚠️ ${f} הצהרות "לא נשב"` + (u ? ` · ${u} לא סביר` : ""),
    },
    en: {
      counted: (p) => `${p}% of votes counted`,
      asOf: "As of ",
      final: "Final results",
      source: "Source",
      official: "Official elections committee site",
      seats: "seats",
      threshold: "Below the threshold",
      blocs: "Blocs",
      bloc: { nbloc: "Netanyahu bloc", change: "Eisenkot bloc", arab: "Arab parties" },
      total: (n) => `${n} seats`,
      missing: (n) => `${n} short of a majority`,
      majority: (n) => `Majority! +${n - 60}`,
      noWarnings: "We found no public statements against this combination. That still doesn't mean it will happen.",
      firm: "Said: won't sit",
      unlikely: "Unlikely",
      note: "Note",
      pickHint: "Pick parties to build a coalition",
      waText: (names, n) => `I built a ${n}-seat coalition: ${names}. Try building your own on Electify 🗳️`,
      copied: "Link copied",
      conflicts: (f, u) => `⚠️ ${f} "won't sit" statement${f === 1 ? "" : "s"}` + (u ? ` · ${u} unlikely` : ""),
    },
  };

  const $ = (id) => document.getElementById(id);
  const lang = () => (document.documentElement.lang === "en" ? "en" : "he");
  const t = (k) => T[lang()][k];
  const party = (id) => D.parties.find((p) => p.id === id);
  const name = (id) => party(id).name[lang()];
  const seats = (id) => R.seats[id] || 0;
  const inKnesset = ORDER.filter((id) => seats(id) > 0);

  let selected = new Set();

  function el(tag, attrs = {}, parent) {
    const n = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    if (parent) parent.appendChild(n);
    return n;
  }

  // ---------- Hemicycle ----------
  // Lays out 120 seats in concentric arcs, then assigns them to parties by angle.
  function hemicycle(svg, highlight) {
    svg.innerHTML = "";
    const total = inKnesset.reduce((s, id) => s + seats(id), 0);
    const rows = 8, r0 = 70, r1 = 190, cx = 200, cy = 200;
    const radii = Array.from({ length: rows }, (_, i) => r0 + (i * (r1 - r0)) / (rows - 1));
    const sumR = radii.reduce((a, b) => a + b, 0);
    let counts = radii.map((r) => Math.round((total * r) / sumR));
    counts[rows - 1] += total - counts.reduce((a, b) => a + b, 0);
    const pts = [];
    radii.forEach((r, i) => {
      const n = counts[i];
      for (let k = 0; k < n; k++) {
        const a = Math.PI - (k / (n - 1)) * Math.PI;
        pts.push({ a, x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) });
      }
    });
    pts.sort((p, q) => q.a - p.a);
    let i = 0;
    inKnesset.forEach((id) => {
      const p = party(id);
      const on = !highlight || highlight.has(id);
      for (let k = 0; k < seats(id); k++, i++) {
        const c = el("circle", { cx: pts[i].x.toFixed(1), cy: pts[i].y.toFixed(1), r: 7, fill: on ? p.color : "var(--line)" }, svg);
        const ti = el("title", {}, c); ti.textContent = `${p.name[lang()]} · ${seats(id)}`;
        c.style.transition = "fill .3s";
        c.style.cursor = "pointer";
        c.onclick = () => (highlight ? toggle(id) : null);
      }
    });
    const big = el("text", { x: cx, y: cy - 14, "text-anchor": "middle", class: "hemi-num" }, svg);
    const small = el("text", { x: cx, y: cy + 6, "text-anchor": "middle", class: "hemi-sub" }, svg);
    if (highlight) {
      const n = coalitionSeats();
      big.textContent = n;
      small.textContent = "/ 120";
    } else {
      big.textContent = "120";
      small.textContent = t("seats");
    }
  }

  // ---------- Results view ----------
  function renderElection() {
    const s = R.status;
    const d = new Date(s.asOf);
    const when = d.toLocaleString(lang() === "he" ? "he-IL" : "en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jerusalem" });
    $("resStatus").innerHTML = `<span class="pill ${s.final ? "final" : "live"}">${s.final ? t("final") : t("counted")(s.counted)}</span>
      <span>${t("asOf")}${when}</span>`;
    $("resNote").textContent = s.note[lang()];
    $("resSource").innerHTML = `${t("source")}: <a href="${s.source.url}" target="_blank" rel="noopener">${s.source[lang()]}</a> · <a href="${s.official}" target="_blank" rel="noopener">${t("official")}</a>`;
    hemicycle($("hemi"), null);

    const list = $("seatList");
    list.innerHTML = "";
    const max = Math.max(...Object.values(R.seats));
    [...inKnesset].sort((a, b) => seats(b) - seats(a)).forEach((id) => {
      const p = party(id);
      const li = document.createElement("li");
      li.innerHTML = `<span class="sw" style="background:${p.color}"></span>
        <span class="nm">${p.name[lang()]}<small>${p.leader[lang()]}</small></span>
        <span class="track"><span style="width:${(seats(id) / max) * 100}%;background:${p.color}"></span></span>
        <b>${seats(id)}</b>`;
      list.appendChild(li);
    });
    const out = D.parties.filter((p) => R.seats[p.id] === 0).map((p) => p.name[lang()]);
    $("belowThreshold").textContent = out.length ? `${t("threshold")}: ${out.join(", ")}` : "";

    const blocs = $("blocs");
    blocs.innerHTML = "";
    const groups = [
      ["nbloc", R.presets.find((x) => x.id === "nbloc").parties],
      ["change", R.presets.find((x) => x.id === "change").parties],
      ["arab", ["joint_list", "raam"]],
    ];
    groups.forEach(([k, ids]) => {
      const n = ids.reduce((s2, id) => s2 + seats(id), 0);
      const div = document.createElement("div");
      div.className = "bloc";
      div.innerHTML = `<b>${n}</b><span>${t("bloc")[k]}</span>`;
      blocs.appendChild(div);
    });
  }

  // ---------- Coalition builder ----------
  function coalitionSeats() {
    return [...selected].reduce((s, id) => s + seats(id), 0);
  }

  function toggle(id) {
    selected.has(id) ? selected.delete(id) : selected.add(id);
    writeHash();
    renderCoalition();
  }

  function renderCoalition() {
    const L = lang();
    const pre = $("presets");
    pre.innerHTML = "";
    R.presets.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip-btn";
      const n = p.parties.reduce((s, id) => s + seats(id), 0);
      b.innerHTML = `${p[L]} <small>${n}</small>`;
      b.onclick = () => { selected = new Set(p.parties); writeHash(); renderCoalition(); };
      pre.appendChild(b);
    });

    const chips = $("chips");
    chips.innerHTML = "";
    [...inKnesset].sort((a, b) => seats(b) - seats(a)).forEach((id) => {
      const p = party(id);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "pchip" + (selected.has(id) ? " on" : "");
      b.style.setProperty("--c", p.color);
      b.setAttribute("aria-pressed", selected.has(id));
      b.innerHTML = `<span class="seat-n">${seats(id)}</span><span class="pn">${p.name[L]}</span>`;
      b.onclick = () => toggle(id);
      chips.appendChild(b);
    });

    const n = coalitionSeats();
    const fill = $("meterFill");
    fill.style.width = `${(n / 120) * 100}%`;
    fill.classList.toggle("ok", n >= MAJORITY);
    $("meterSegs").innerHTML = [...selected].sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b))
      .map((id) => `<span style="flex:${seats(id)};background:${party(id).color}" title="${name(id)}"></span>`).join("");
    $("meterText").innerHTML = selected.size === 0
      ? t("pickHint")
      : `<b>${t("total")(n)}</b> · ${n >= MAJORITY ? `<span class="good">${t("majority")(n)}</span>` : t("missing")(MAJORITY - n)}`;
    hemicycle($("hemi2"), selected);

    // Warnings
    const ul = $("warnings");
    ul.innerHTML = "";
    const items = [];
    R.vetoes.forEach((v) => {
      v.from.forEach((f) => {
        if (!selected.has(f)) return;
        const hit = v.to.filter((x) => selected.has(x) && x !== f);
        if (hit.length) items.push({ kind: v.strength, from: [f], to: hit, text: v[L], src: v.src });
      });
    });
    // Merge rows that come from the same statement (e.g. two parties sharing one veto).
    const merged = [];
    items.forEach((it) => {
      const m = merged.find((x) => x.text === it.text && x.src === it.src && x.to.join() === it.to.join());
      if (m) m.from.push(...it.from); else merged.push(it);
    });
    merged.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "firm" ? -1 : 1));
    const nf = merged.filter((m) => m.kind === "firm").length, nu = merged.filter((m) => m.kind === "unlikely").length;
    if (nf || nu) {
      const a = document.createElement("a");
      a.href = "#warnings";
      a.className = "conflicts " + (nf ? "firm" : "unlikely");
      a.textContent = t("conflicts")(nf, nu);
      a.onclick = (e) => { e.preventDefault(); $("warnings").scrollIntoView({ behavior: "smooth", block: "center" }); };
      $("meterText").appendChild(document.createTextNode(" "));
      $("meterText").appendChild(a);
    }
    R.notes.forEach((nt) => { if (selected.has(nt.party)) merged.push({ kind: "note", from: [nt.party], to: [], text: nt[L], src: nt.src }); });

    if (selected.size > 1 && merged.filter((m) => m.kind !== "note").length === 0) {
      const li = document.createElement("li");
      li.className = "warn ok";
      li.textContent = t("noWarnings");
      ul.appendChild(li);
    }
    merged.forEach((m) => {
      const li = document.createElement("li");
      li.className = `warn ${m.kind}`;
      const src = R.sources[m.src];
      const label = m.kind === "firm" ? t("firm") : m.kind === "unlikely" ? t("unlikely") : t("note");
      const who = m.to.length
        ? `<span class="pair">${m.from.map(name).join(" + ")} <span class="x">✕</span> ${m.to.map(name).join(", ")}</span>`
        : `<span class="pair">${m.from.map(name).join(" + ")}</span>`;
      li.innerHTML = `<div class="wtop"><span class="tag">${label}</span>${who}</div>
        <p>${m.text}</p>${src ? `<a href="${src.url}" target="_blank" rel="noopener">${src.title}</a>` : ""}`;
      ul.appendChild(li);
    });
  }

  // ---------- Share ----------
  function writeHash() {
    if (!$("coalition").classList.contains("active")) return;
    history.replaceState(null, "", selected.size ? "#c=" + [...selected].join(",") : location.pathname);
  }

  function readHash() {
    const m = location.hash.match(/^#c=([a-z_,]+)$/);
    if (!m) return false;
    selected = new Set(m[1].split(",").filter((id) => seats(id) > 0));
    return true;
  }

  function toast(msg) {
    const n = $("toast");
    n.textContent = msg;
    n.classList.add("show");
    setTimeout(() => n.classList.remove("show"), 1800);
  }

  $("coalReset").onclick = () => { selected.clear(); writeHash(); renderCoalition(); };
  $("coalWa").onclick = () => {
    const names = [...selected].map(name).join(", ");
    const url = location.origin + location.pathname + "#c=" + [...selected].join(",");
    const msg = t("waText")(names || "—", coalitionSeats()) + "\n" + url;
    window.open("https://wa.me/?text=" + encodeURIComponent(msg), "_blank", "noopener");
  };
  $("coalCopy").onclick = async () => {
    const url = location.origin + location.pathname + "#c=" + [...selected].join(",");
    try { await navigator.clipboard.writeText(url); toast(t("copied")); } catch (_) { prompt("", url); }
  };

  function renderAll() { renderElection(); renderCoalition(); }
  document.addEventListener("langchange", renderAll);
  window.Coalition = { readHash, writeHash, renderAll };
})();
