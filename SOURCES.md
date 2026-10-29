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

## Election results (updated 28 Oct 2026)
Seat counts are in [`results.js`](results.js). The official results site (https://votes26.bechirot.gov.il/) could not be read automatically, so the numbers come from news reports of the Central Elections Committee count:
- Globes live blog — about 91% counted (excluding double envelopes) at 06:10 on 29 Oct 2026; Ra'am up to 8 seats at the Joint List's expense (Joint List 11 is inferred from that report; single source so far): https://www.globes.co.il/news/article.aspx?did=1001561230
- Zman Israel live blog — 90.1% counted from 97.6% of polling stations as of 00:59 on 29 Oct 2026; double-envelope count began at 01:00; seats unchanged: https://www.zman.co.il/live/737512/
- Kikar HaShabbat, *89.8% counted, no change in the seat map* — 28 Oct 2026 22:44 Israel time: https://www.kikar.co.il/scoop-news/89801
- Walla, *88% of votes counted, double envelopes count begins at 1:00* — 88% (5,047,241 votes), 28 Oct 2026 21:08 Israel time: https://www.walla.co.il/news/israel/383959283
- Jerusalem Post, same seat figures at ~88% counted (updated 28 Oct 2026 22:35): https://www.jpost.com/israel-election-2026/article-913164
- Earlier: ynetnews at 85.6% counted (15:13), which had Joint List 13 / Ra'am 6: https://www.ynetnews.com/article/hjnatbkaml

These are partial results before double envelopes (soldiers and absentee voters) are counted; official results are due 4 November 2026. Update `results.js` → `seats` and `status` as counting finishes.

## Coalition builder: who won't sit with whom
Each "veto" in `results.js` is marked **firm** (a public "will not sit" statement or hard coalition condition) or **unlikely** (no explicit vow, but long-standing positions make it improbable). This is an unofficial summary; positions can change during negotiations.

| Statement | Strength | Source |
|---|---|---|
| Yisrael Beytenu (Liberman) won't sit with Shas / UTJ | firm | Jerusalem Post, 25 Aug 2026 — https://jpost.com/israel-election-2026/article-906447 |
| Yisrael Beytenu won't sit with or rely on Arab parties | firm | Jerusalem Post, 25 Aug 2026 (same) |
| Yisrael Beytenu won't serve under Netanyahu (Likud without him possible) | firm | Jerusalem Post, 25 Aug 2026 (same) |
| Yashar! (Eisenkot) won't serve under Netanyahu, even in rotation | firm | ynet, 21 Oct 2026 — https://www.ynet.co.il/news/elections2026/article/hkj8dy8nfe |
| Yashar! says Ra'am won't be in his government; no Arab party meets his conditions | firm | N12 *Meet the Press*, 26 Sep 2026 — https://www.mako.co.il/news-israel-elections/2026_q4/Article-195ef5f365ad0a1026.htm |
| Yashar!: no Haredi party currently meets his service conditions (open to Shas if it accepts them) | unlikely | N12, 26 Sep 2026 (same) |
| Together (Bennett) won't join a Netanyahu-led government | firm | ynetnews, 17 Feb 2026 — https://www.ynetnews.com/article/hkr4bazo11x |
| Together won't rely on Arab parties; rules out Ra'am | firm | ynet, 21 Oct 2026 (above) |
| UTJ won't back a government that doesn't enshrine a draft exemption (clashes with draft-demanding parties) | firm | Times of Israel party guide, Oct 2026 — https://www.timesofisrael.com/everything-you-need-to-know-tois-guide-to-the-37-parties-that-israelis-can-finally-choose-from/ |
| Shas opposes universal conscription; part of Netanyahu's bloc | unlikely | Times of Israel party guide (same) |
| Likud (Netanyahu) won't form a government relying on Arab parties | firm | mako live blog, 28 Oct 2026 03:14 — https://www.mako.co.il/news-politics/2026_q4/liveblog-f5b5a09693081a1026.htm |
| Otzma Yehudit and the Arab parties shun each other | unlikely | Times of Israel party guide (same) |
| Religious Zionism won't sit with Ra'am | unlikely (2021 statement) | Israel Hayom, 25 Mar 2021 — https://www.israelhayom.com/2021/03/25/religious-zionist-party-says-wont-sit-in-coalition-with-raam/ |
| Otzma / Religious Zionism vs. the change bloc ("Don't count on the left") | unlikely | Times of Israel, 19 Oct 2026 — https://www.timesofisrael.com/ben-gvir-says-netanyahu-pledged-to-exclude-him-from-next-government-as-election-nears/ |
| Democrats (with the change bloc) won't sit with October 7 government parties | firm | ynet, 21 Oct 2026 (above) |
| Joint List (Jabareen) aims to replace the Netanyahu–Ben Gvir–Smotrich government; offers outside support only | firm | ynetnews, 28 Oct 2026 — https://www.ynetnews.com/article/hjnatbkaml |
