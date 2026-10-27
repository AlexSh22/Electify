(() => {
  const D = window.ELECTION_DATA;
  const Q = D.questions;
  const P = D.parties;
  const SVGNS = "http://www.w3.org/2000/svg";

  const T = {
    en: {
      brand: "Election Match 2026",
      title: "Which party is closest to you?",
      lead: "Answer 10 questions on the issues shaping Israel's 2026 election. We'll compare your answers with the published positions of 13 parties.",
      start: "Start",
      disclaimer: "Unofficial and independent. Party positions are our short summaries of public reporting and may be incomplete or inaccurate. This is not voting advice; check each party's own platform.",
      back: "Back",
      skip: "Skip",
      important: "This matters a lot to me",
      scale: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
      of: (i, n) => `Question ${i} of ${n}`,
      closest: "Your closest match",
      ranking: "Match by party",
      rankingHint: "Tap a party to compare issue by issue.",
      map: "Political map",
      mapHint: "Bubble size reflects recent poll averages. The yellow dot is you.",
      compare: "You vs.",
      share: "Copy link to my results",
      restart: "Start over",
      sources: "Sources and methodology",
      copied: "Link copied",
      agree: "Agree", partial: "Partly", disagree: "Disagree", na: "No clear position",
      you: "You",
      based: (n) => `${n}/10 issues`,
      party: "Party",
    },
    he: {
      brand: "התאמה בבחירות 2026",
      title: "איזו מפלגה הכי קרובה אליך?",
      lead: "ענו על 10 שאלות בנושאים שמעצבים את בחירות 2026. נשווה את התשובות שלכם לעמדות המפורסמות של 13 מפלגות.",
      start: "מתחילים",
      disclaimer: "לא רשמי ובלתי תלוי. עמדות המפלגות הן סיכום קצר שלנו של דיווחים פומביים ועשויות להיות חלקיות או לא מדויקות. זו אינה המלצת הצבעה; בדקו את המצע של כל מפלגה.",
      back: "חזרה",
      skip: "דלג",
      important: "הנושא הזה חשוב לי במיוחד",
      scale: ["מתנגד/ת מאוד", "מתנגד/ת", "ניטרלי", "מסכים/ה", "מסכים/ה מאוד"],
      of: (i, n) => `שאלה ${i} מתוך ${n}`,
      closest: "ההתאמה הקרובה ביותר",
      ranking: "התאמה לפי מפלגה",
      rankingHint: "לחצו על מפלגה להשוואה לפי נושא.",
      map: "מפה פוליטית",
      mapHint: "גודל הבועה לפי ממוצע הסקרים האחרונים. הנקודה הצהובה היא אתם.",
      compare: "אתם מול",
      share: "העתקת קישור לתוצאות",
      restart: "להתחיל מחדש",
      sources: "מקורות ומתודולוגיה",
      copied: "הקישור הועתק",
      agree: "מסכימים", partial: "חלקית", disagree: "לא מסכימים", na: "אין עמדה ברורה",
      you: "אתם",
      based: (n) => `${n}/10 נושאים`,
      party: "מפלגה",
    },
  };

  const SCALE_COLORS = ["#ff6b7a", "#ff9e8a", "#9aa6c0", "#7fd3a8", "#3ccf91"];

  let lang = "he";
  try { lang = localStorage.getItem("lang") || (navigator.language.startsWith("he") ? "he" : "en"); } catch (_) {}
  let answers = new Array(Q.length).fill(undefined); // -2..2, null = skipped
  let important = new Array(Q.length).fill(false);
  let idx = 0;
  let selected = null;

  const $ = (id) => document.getElementById(id);
  const t = (k) => T[lang][k];
  const L = (o) => o[lang];

  function el(tag, attrs = {}, parent) {
    const n = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    if (parent) parent.appendChild(n);
    return n;
  }

  function show(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.toggle("active", s.id === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
    $("lang").textContent = lang === "he" ? "English" : "עברית";
    $("electionLabel").textContent = L(D.election);
    if ($("quiz").classList.contains("active")) renderQuestion();
    if ($("results").classList.contains("active")) renderResults(false);
  }

  // ---------- Quiz ----------
  function renderQuestion() {
    const q = Q[idx];
    $("qnum").textContent = t("of")(idx + 1, Q.length);
    $("qtopic").textContent = L(q.topic);
    $("qtext").textContent = q[lang];
    $("progressBar").style.width = `${(idx / Q.length) * 100}%`;
    $("important").checked = important[idx];
    $("back").disabled = idx === 0;
    const scale = $("scale");
    scale.innerHTML = "";
    t("scale").forEach((label, i) => {
      const v = i - 2;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opt" + (answers[idx] === v ? " selected" : "");
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", answers[idx] === v);
      b.innerHTML = `<i class="dot" style="background:${SCALE_COLORS[i]}"></i><span>${label}</span>`;
      b.onclick = () => answer(v);
      scale.appendChild(b);
    });
  }

  function answer(v) {
    answers[idx] = v;
    important[idx] = $("important").checked;
    next();
  }

  function next() {
    if (idx < Q.length - 1) { idx++; renderQuestion(); }
    else finish();
  }

  function finish() {
    $("progressBar").style.width = "100%";
    selected = null;
    writeHash();
    show("results");
    renderResults(true);
  }

  // ---------- Scoring ----------
  function score(party) {
    let sum = 0, wsum = 0, n = 0;
    Q.forEach((_, i) => {
      const u = answers[i], p = party.positions[i];
      if (u === null || u === undefined || p === null || p === undefined) return;
      const w = important[i] ? 2 : 1;
      sum += w * (1 - Math.abs(u - p) / 4);
      wsum += w;
      n++;
    });
    return { pct: wsum ? Math.round((sum / wsum) * 100) : 0, n };
  }

  function axisValue(values, axis) {
    let s = 0, n = 0;
    axis.questions.forEach((qid) => {
      const i = Q.findIndex((q) => q.id === qid);
      const v = values[i];
      if (v === null || v === undefined) return;
      s += axis.invert.includes(qid) ? -v : v;
      n++;
    });
    return n ? s / n : 0;
  }

  // ---------- Results ----------
  function renderResults(animate) {
    const ranked = P.map((p) => ({ p, ...score(p) })).sort((a, b) => b.pct - a.pct || b.n - a.n);
    if (!selected) selected = ranked[0].p.id;
    const top = ranked[0];

    $("winnerName").textContent = L(top.p.name);
    $("winnerLeader").textContent = L(top.p.leader);
    $("ringPct").textContent = `${top.pct}%`;
    const ring = $("ringFg");
    const C = 2 * Math.PI * 52;
    ring.style.stroke = top.p.color;
    ring.style.strokeDasharray = C;
    ring.style.strokeDashoffset = C;
    requestAnimationFrame(() => requestAnimationFrame(() => { ring.style.strokeDashoffset = C * (1 - top.pct / 100); }));

    const bars = $("bars");
    bars.innerHTML = "";
    ranked.forEach(({ p, pct, n }) => {
      const li = document.createElement("li");
      li.className = p.id === selected ? "active" : "";
      li.innerHTML = `<div><div class="bar-label"><span>${L(p.name)}</span><span class="cov">${t("based")(n)}</span></div>
        <div class="bar-track"><div class="bar-fill" style="background:${p.color}"></div></div></div>
        <div class="bar-pct">${pct}%</div>`;
      li.onclick = () => { selected = p.id; renderResults(false); };
      bars.appendChild(li);
      const fill = li.querySelector(".bar-fill");
      if (animate) requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = pct + "%"; }));
      else fill.style.width = pct + "%";
    });

    renderMap();
    renderCompare(P.find((p) => p.id === selected));
  }

  function renderMap() {
    const svg = $("map");
    svg.innerHTML = "";
    const S = 400, pad = 56, inner = S - pad * 2;
    const rtl = lang === "he";
    // In RTL, mirror x so the "low" label stays at the reading start.
    const sx = (v) => { const f = (v + 2) / 4; return pad + (rtl ? 1 - f : f) * inner; };
    const sy = (v) => pad + (1 - (v + 2) / 4) * inner;
    el("line", { x1: pad, y1: S / 2, x2: S - pad, y2: S / 2, class: "axis" }, svg);
    el("line", { x1: S / 2, y1: pad, x2: S / 2, y2: S - pad, class: "axis" }, svg);
    el("rect", { x: pad, y: pad, width: inner, height: inner, fill: "none", class: "axis", rx: 12, stroke: "currentColor", "stroke-opacity": 0.15 }, svg);
    const { x, y } = D.axes;
    const lbl = (txt, X, Y, anchor) => { const n = el("text", { x: X, y: Y, "text-anchor": anchor }, svg); n.textContent = txt; };
    lbl(L(x.low), rtl ? S - pad : pad, S - 14, rtl ? "end" : "start");
    lbl(L(x.high), rtl ? pad : S - pad, S - 14, rtl ? "start" : "end");
    [[y.high, pad + inner * 0.25], [y.low, pad + inner * 0.75]].forEach(([a, cy]) => {
      const n = el("text", { x: 18, y: cy, "text-anchor": "middle", transform: `rotate(-90 18 ${cy})` }, svg);
      n.textContent = L(a);
    });

    // Small jitter so parties with identical coordinates don't fully overlap.
    const seen = {};
    P.forEach((p) => {
      let px = sx(axisValue(p.positions, x)), py = sy(axisValue(p.positions, y));
      const key = Math.round(px / 8) + ":" + Math.round(py / 8);
      const k = (seen[key] = (seen[key] || 0) + 1) - 1;
      px += k * 14; py -= k * 10;
      const r = 7 + Math.sqrt(p.seats || 1) * 2.6;
      const g = el("g", { class: "bubble", tabindex: 0 }, svg);
      el("circle", { cx: px, cy: py, r, fill: p.color, "fill-opacity": p.id === selected ? 0.95 : 0.6, stroke: p.id === selected ? "var(--text)" : "none", "stroke-width": 2 }, g);
      const tx = el("text", { x: px, y: py - r - 4, "text-anchor": "middle" }, g);
      tx.textContent = L(p.name);
      const title = el("title", {}, g); title.textContent = `${L(p.name)} · ${L(p.leader)}`;
      g.onclick = () => { selected = p.id; renderResults(false); };
    });
    const yx = sx(axisValue(answers, x)), yy = sy(axisValue(answers, y));
    const g = el("g", { class: "you" }, svg);
    el("circle", { cx: yx, cy: yy, r: 9 }, g);
    const yt = el("text", { x: yx, y: yy + 26, "text-anchor": "middle" }, g);
    yt.textContent = t("you");
  }

  function renderCompare(party) {
    $("compareName").textContent = L(party.name);
    const svg = $("radar");
    svg.innerHTML = "";
    const c = 220, R = 150, n = Q.length;
    const dir = lang === "he" ? -1 : 1;
    const ang = (i) => -Math.PI / 2 + dir * (i / n) * Math.PI * 2;
    const pt = (i, v) => { const r = ((v + 2) / 4) * R; return [c + r * Math.cos(ang(i)), c + r * Math.sin(ang(i))]; };

    [0.25, 0.5, 0.75, 1].forEach((f) => {
      const pts = Q.map((_, i) => { const a = ang(i); return [c + f * R * Math.cos(a), c + f * R * Math.sin(a)].join(","); });
      el("polygon", { points: pts.join(" "), class: "grid-line" }, svg);
    });
    Q.forEach((q, i) => {
      const [x2, y2] = [c + R * Math.cos(ang(i)), c + R * Math.sin(ang(i))];
      el("line", { x1: c, y1: c, x2, y2, class: "grid-line" }, svg);
      const lx = c + (R + 22) * Math.cos(ang(i)), ly = c + (R + 22) * Math.sin(ang(i));
      const anchor = Math.abs(lx - c) < 10 ? "middle" : lx > c ? "start" : "end";
      const tx = el("text", { x: lx, y: ly + 4, "text-anchor": anchor }, svg);
      tx.textContent = L(q.topic);
    });

    const val = (v) => (v === null || v === undefined ? 0 : v);
    el("polygon", { points: Q.map((_, i) => pt(i, val(party.positions[i])).join(",")).join(" "), class: "poly-party", fill: party.color, stroke: party.color }, svg);
    el("polygon", { points: Q.map((_, i) => pt(i, val(answers[i])).join(",")).join(" "), class: "poly-you" }, svg);
    Q.forEach((_, i) => {
      const pp = party.positions[i];
      const [x, y] = pt(i, val(pp));
      el("circle", { cx: x, cy: y, r: 4, fill: pp === null ? "none" : party.color, stroke: party.color, "stroke-width": 1.5 }, svg);
    });

    // Legend
    const lg = el("g", {}, svg);
    el("rect", { x: -40, y: 410, width: 12, height: 12, rx: 3, fill: "var(--you)" }, lg);
    el("text", { x: -22, y: 420 }, lg).textContent = t("you");
    el("rect", { x: 40, y: 410, width: 12, height: 12, rx: 3, fill: party.color }, lg);
    el("text", { x: 58, y: 420 }, lg).textContent = L(party.name);
    if (lang === "he") lg.setAttribute("transform", "translate(320,0)");

    const ul = $("breakdown");
    ul.innerHTML = "";
    const scale = t("scale");
    Q.forEach((q, i) => {
      const u = answers[i], p = party.positions[i];
      let cls = "na", label = t("na");
      if (u !== null && u !== undefined && p !== null) {
        const d = Math.abs(u - p);
        cls = d <= 1 ? "agree" : d <= 2 ? "partial" : "disagree";
        label = t(cls);
      }
      const li = document.createElement("li");
      const you = u === null || u === undefined ? "—" : scale[u + 2];
      const them = p === null ? "—" : scale[p + 2];
      li.innerHTML = `<div><div>${important[i] ? "★ " : ""}${L(q.topic)}</div>
        <div class="pos">${t("you")}: ${you} · ${L(party.name)}: ${them}</div></div>
        <span class="verdict ${cls}">${label}</span>`;
      ul.appendChild(li);
    });
  }

  // ---------- Share via URL hash ----------
  // Format: #r=<10 chars>, each char 0-4 for an answer, "s" for skipped; uppercase "!" suffix marks important.
  function writeHash() {
    const enc = answers.map((a, i) => (a === null || a === undefined ? "s" : String(a + 2)) + (important[i] ? "!" : "")).join("");
    history.replaceState(null, "", "#r=" + enc);
  }
  function readHash() {
    const m = location.hash.match(/^#r=([0-4s!]+)$/);
    if (!m) return false;
    const toks = m[1].match(/[0-4s]!?/g) || [];
    if (toks.length !== Q.length) return false;
    toks.forEach((tk, i) => {
      answers[i] = tk[0] === "s" ? null : Number(tk[0]) - 2;
      important[i] = tk.endsWith("!");
    });
    return true;
  }

  function toast(msg) {
    const n = $("toast");
    n.textContent = msg;
    n.classList.add("show");
    setTimeout(() => n.classList.remove("show"), 1800);
  }

  // ---------- Wire up ----------
  $("lang").onclick = () => {
    lang = lang === "he" ? "en" : "he";
    try { localStorage.setItem("lang", lang); } catch (_) {}
    applyLang();
  };
  $("start").onclick = () => { idx = 0; show("quiz"); renderQuestion(); };
  $("back").onclick = () => { if (idx > 0) { important[idx] = $("important").checked; idx--; renderQuestion(); } };
  $("skip").onclick = () => { answers[idx] = null; important[idx] = false; next(); };
  $("important").onchange = (e) => { important[idx] = e.target.checked; };
  $("restart").onclick = () => {
    answers = new Array(Q.length).fill(undefined);
    important = new Array(Q.length).fill(false);
    history.replaceState(null, "", location.pathname);
    show("intro");
  };
  $("share").onclick = async () => {
    try { await navigator.clipboard.writeText(location.href); toast(t("copied")); }
    catch (_) { prompt("", location.href); }
  };
  document.addEventListener("keydown", (e) => {
    if (!$("quiz").classList.contains("active")) return;
    if (e.key >= "1" && e.key <= "5") answer(Number(e.key) - 3);
  });

  applyLang();
  if (readHash()) { show("results"); renderResults(true); }
})();
