# Sources and methodology

## How matching works
Each of the 10 questions is answered on a 5-point scale (-2 strongly disagree … +2 strongly agree).
Every party has a position on the same scale in [`data.js`](data.js), or `null` when it has no clear public position.
For each question both you and the party answered, similarity = `1 - |you - party| / 4`.
Questions you mark as "matters a lot to me" count double. The match % is the weighted average.
Questions you skip, or where a party has no position, are left out for that party (the results show how many issues each match is based on).

The political map averages questions into two axes (defined in `data.js` → `axes`):
- **Diplomatic ↔ Hawkish:** Palestinian state (inverted), settlements & sovereignty, Gaza emigration.
- **Religious-traditional ↔ Liberal-secular:** Haredi draft, civil marriage & Shabbat transport, core curriculum.

Bubble sizes use the MEF poll-of-polls average (fieldwork 7–21 Oct 2026). Amcha Yisrael and the Reservists–Economic Party were below the threshold in most polls.

## Important caveats
- Positions are short editorial summaries of public reporting as of late October 2026. Several are **inferred** from leaders' statements or coalition record where a party published no platform on that issue. They may be inaccurate, incomplete or out of date.
- Joint lists (e.g. Together; Religious Zionism–Zehut; Joint List) contain factions with different views; the data reflects the list's general direction.
- This is not voting advice. Read each party's own platform.
- Corrections welcome: edit `data.js` and open a pull request.

## Sources
- Israel Policy Forum, *120 Project: Israel Elections 2026* — party-by-party positions: https://israelpolicyforum.org/onetwenty/
- The Times of Israel, *2026 Knesset Elections: the stakes, the process, the parties* (guide to the 37 lists): https://www.timesofisrael.com/everything-you-need-to-know-tois-guide-to-the-37-parties-that-israelis-can-finally-choose-from/
- Ynet News, *Where every party stands on the judicial overhaul and Supreme Court*: https://www.ynetnews.com/article/hkcjtk1cme
- Wikipedia, *2026 Israeli legislative election* (lists, leaders, alliances, election date): https://en.wikipedia.org/wiki/2026_Israeli_legislative_election
- Middle East Forum, *Israel Election 2026 Poll of Polls* (seat averages, updated 23 Oct 2026): https://israelvote.meforum.org/
- JNS, *Israel's political parties explained* series (Yashar, Together): https://jns.org/feature/israels-political-parties-explained-yashar · https://www.jns.org/feature/israels-political-parties-explained-together
