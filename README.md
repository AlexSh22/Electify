# Election Match 2026 · התאמה בבחירות

A small, static voting-advice app for Israel's 27 October 2026 Knesset election.
Answer 10 questions (Hebrew or English) and see which of 13 parties is closest to you, with:

- a match ring for your top party,
- ranked match bars for every party,
- a 2-D political map with you plotted among the parties (bubble size = poll average),
- a radar chart and issue-by-issue breakdown comparing you with any party you tap,
- a shareable results link (answers are stored only in the URL, nothing is sent anywhere).

**Unofficial and neutral. Positions are summaries and may be inaccurate. See [SOURCES.md](SOURCES.md).**

## Editing
All questions, translations and party positions live in [`data.js`](data.js). No build step.

## Running locally
Open `index.html` in a browser, or `python3 -m http.server` and visit http://localhost:8000.

## Deploying
Hosted on GitHub Pages from the `main` branch root.
