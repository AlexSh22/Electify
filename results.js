// Election results and coalition "vetoes". Edit this file to update seat counts as
// counting progresses; party ids match `parties` in data.js. No build step needed.
//
// Vetoes: `from` is the party (or parties) that made the statement, `to` the party
// they reject. `strength` is "firm" (a public "will not sit" / hard condition) or
// "unlikely" (no explicit vow, but long-standing positions make it improbable).
// `src` indexes into `sources`. This is an unofficial summary; see SOURCES.md.

window.ELECTION_RESULTS = {
  status: {
    counted: 90.1,
    asOf: "2026-10-29T00:59:00+02:00",
    final: false,
    note: {
      he: "כ-90% מהקולות נספרו, לפני המעטפות הכפולות (חיילים ומצביעים מחוץ לקלפי). ספירתן החלה ב-01:00 ותסתיים הערב. התוצאות הרשמיות ייקבעו ב-4 בנובמבר.",
      en: "About 90% of votes counted, before double envelopes (soldiers and absentee voters). Their count began at 01:00 and should end this evening. Official results are due 4 November.",
    },
    source: {
      he: "זמן ישראל לפי נתוני ועדת הבחירות המרכזית",
      en: "Zman Israel, citing Central Elections Committee data",
      url: "https://www.zman.co.il/live/737512/",
    },
    official: "https://votes26.bechirot.gov.il/",
  },
  seats: {
    likud: 26, yashar: 21, joint_list: 12, together: 12, democrats: 8,
    yisrael_beytenu: 7, utj: 7, shas: 7, otzma: 7, rz_zehut: 6, raam: 7,
    reservists: 0, amcha: 0,
  },
  // Party names that appear in the presets below.
  presets: [
    { id: "nbloc", he: "גוש נתניהו", en: "Netanyahu bloc", parties: ["likud", "shas", "utj", "otzma", "rz_zehut"] },
    { id: "change", he: "גוש איזנקוט", en: "Eisenkot bloc", parties: ["yashar", "together", "democrats", "yisrael_beytenu"] },
    { id: "change_arab", he: "שינוי + מפלגות ערביות", en: "Change + Arab parties", parties: ["yashar", "together", "democrats", "yisrael_beytenu", "raam", "joint_list"] },
    { id: "unity", he: "אחדות: ליכוד + ישר! + ביחד", en: "Unity: Likud + Yashar! + Together", parties: ["likud", "yashar", "together"] },
  ],
  // Notes that apply when a single party is in the coalition.
  notes: [
    {
      party: "joint_list", src: 5,
      he: "הרשימה המשותפת לא מבקשת להצטרף לממשלה. היא הציעה \"רשת ביטחון\" מבחוץ לממשלה חלופית.",
      en: "The Joint List does not seek to join a government. It offered an outside \"safety net\" to an alternative government.",
    },
  ],
  vetoes: [
    // Yisrael Beytenu
    { from: ["yisrael_beytenu"], to: ["shas", "utj"], strength: "firm", src: 0,
      he: "ליברמן שלל קואליציה עם ש\"ס ויהדות התורה, בגלל גיוס, לימודי ליבה ותחבורה בשבת.",
      en: "Liberman ruled out a coalition with Shas and UTJ over the draft, core studies and Shabbat transport." },
    { from: ["yisrael_beytenu"], to: ["raam", "joint_list"], strength: "firm", src: 0,
      he: "ליברמן שלל קואליציה עם המפלגות הערביות וגם ממשלה שנשענת עליהן.",
      en: "Liberman ruled out a coalition with the Arab parties, or a government that relies on them." },
    { from: ["yisrael_beytenu"], to: ["likud"], strength: "firm", src: 0,
      he: "ליברמן: לא אשב תחת נתניהו \"גם אם העולם יתהפך\" (ליכוד בלי נתניהו - אפשרי).",
      en: "Liberman: won't serve under Netanyahu \"even if the world turns upside down\" (a Likud without Netanyahu is possible)." },
    // Yashar!
    { from: ["yashar"], to: ["likud"], strength: "firm", src: 1,
      he: "איזנקוט התחייב לא לכהן תחת נתניהו, גם לא ברוטציה.",
      en: "Eisenkot pledged not to serve under Netanyahu, not even in a rotation." },
    { from: ["yashar"], to: ["raam"], strength: "firm", src: 2,
      he: "איזנקוט: רע\"מ \"לא יהיו חלק מהממשלה\", כי היא לא מכירה בחמאס כארגון טרור.",
      en: "Eisenkot: Ra'am \"will not be part of the government\" as it doesn't recognize Hamas as a terror group." },
    { from: ["yashar"], to: ["joint_list"], strength: "firm", src: 2,
      he: "לפי איזנקוט, אף מפלגה ערבית לא עומדת כיום בתנאים שלו (מדינה יהודית ודמוקרטית, שירות לאומי).",
      en: "Eisenkot says no Arab party currently meets his conditions (Jewish and democratic state, national service)." },
    { from: ["yashar"], to: ["shas", "utj"], strength: "unlikely", src: 2,
      he: "איזנקוט: אף מפלגה חרדית לא מקבלת כיום את תנאי השירות שלו. אמר שיוכל לשבת עם ש\"ס אם תקבל אותם.",
      en: "Eisenkot: no Haredi party currently accepts his service conditions, though he could sit with Shas if it did." },
    // Together
    { from: ["together"], to: ["likud"], strength: "firm", src: 3,
      he: "בנט: לא אצטרף לממשלה בראשות נתניהו.",
      en: "Bennett: will not join a government led by Netanyahu." },
    { from: ["together"], to: ["raam", "joint_list"], strength: "firm", src: 1,
      he: "בנט: \"המפלגות הערביות אינן ציוניות ולכן לא נישען עליהן\", ושלל את רע\"מ לחלוטין.",
      en: "Bennett: \"the Arab parties are not Zionist, so we will not rely on them\", ruling out Ra'am completely." },
    // Haredi parties
    { from: ["utj"], to: ["yashar", "together", "yisrael_beytenu", "democrats"], strength: "firm", src: 4,
      he: "יהדות התורה לא תתמוך בממשלה שלא תעגן פטור מגיוס לתלמידי ישיבות, וזה מנוגד לדרישת הגיוס של המפלגה הזו.",
      en: "UTJ won't back any government that doesn't enshrine a yeshiva draft exemption, which clashes with this party's draft demand." },
    { from: ["shas"], to: ["yashar", "together", "yisrael_beytenu", "democrats"], strength: "unlikely", src: 4,
      he: "ש\"ס מתנגדת לגיוס חובה לתלמידי ישיבות, ורואים בה חלק מגוש נתניהו.",
      en: "Shas opposes compulsory service for yeshiva students and is seen as part of Netanyahu's bloc." },
    // Likud
    { from: ["likud"], to: ["raam", "joint_list"], strength: "firm", src: 6,
      he: "נתניהו: \"אסור ... להקים ממשלה שנשענת על מפלגות ערביות\".",
      en: "Netanyahu: we must not \"form a government that relies on Arab parties\"." },
    // Right-wing parties
    { from: ["otzma"], to: ["raam", "joint_list"], strength: "unlikely", src: 4,
      he: "עוצמה יהודית נמנעת משותפות עם המפלגות הערביות, ושני הצדדים מחרימים זה את זה.",
      en: "Otzma Yehudit shuns the Arab parties, and the boycott is mutual." },
    { from: ["rz_zehut"], to: ["raam", "joint_list"], strength: "unlikely", src: 7,
      he: "הציונות הדתית הודיעה בעבר (2021) שלא תשב בקואליציה עם רע\"מ.",
      en: "Religious Zionism has said (2021) it will not sit in a coalition with Ra'am." },
    { from: ["otzma", "rz_zehut"], to: ["yashar", "democrats", "together"], strength: "unlikely", src: 8,
      he: "בן גביר וסמוטריץ' מציגים את מפלגות השינוי כ\"שמאל\", ובן גביר אמר לנתניהו: \"אל תספור על השמאל\".",
      en: "Ben Gvir and Smotrich frame the change-bloc parties as \"the left\". Ben Gvir told Netanyahu: \"Don't count on the left\"." },
    // Democrats and Arab parties
    { from: ["democrats"], to: ["likud", "otzma", "rz_zehut"], strength: "firm", src: 1,
      he: "מפלגות גוש השינוי, ובהן הדמוקרטים, הצהירו שלא ישבו עם מי שכיהן בממשלת 7 באוקטובר.",
      en: "Change-bloc parties, the Democrats among them, said they won't sit with those who served in the October 7 government." },
    { from: ["joint_list"], to: ["likud", "otzma", "rz_zehut"], strength: "firm", src: 5,
      he: "ג'בארין: \"נהיה מוכנים לסלול את הדרך להחלפת ממשלת נתניהו, בן גביר וסמוטריץ'\".",
      en: "Jabareen: \"We will be prepared to pave the way for removing the Netanyahu, Ben-Gvir and Smotrich government\"." },
    { from: ["raam"], to: ["otzma", "rz_zehut"], strength: "unlikely", src: 7,
      he: "רע\"מ פתוחה לשני הצדדים, אבל עוצמה יהודית והציונות הדתית פוסלות אותה.",
      en: "Ra'am is open to both sides, but Otzma Yehudit and Religious Zionism rule it out." },
  ],
  sources: [
    { title: "Jerusalem Post, Liberman's positions (25 Aug 2026)", url: "https://jpost.com/israel-election-2026/article-906447" },
    { title: "ynet, scenarios for forming a government (21 Oct 2026)", url: "https://www.ynet.co.il/news/elections2026/article/hkj8dy8nfe" },
    { title: "N12 Meet the Press, Eisenkot interview (26 Sep 2026)", url: "https://www.mako.co.il/news-israel-elections/2026_q4/Article-195ef5f365ad0a1026.htm" },
    { title: "ynetnews, Bennett won't join a Netanyahu government (17 Feb 2026)", url: "https://www.ynetnews.com/article/hkr4bazo11x" },
    { title: "Times of Israel, guide to the parties (Oct 2026)", url: "https://www.timesofisrael.com/everything-you-need-to-know-tois-guide-to-the-37-parties-that-israelis-can-finally-choose-from/" },
    { title: "ynetnews, results and Jabareen statement (28 Oct 2026)", url: "https://www.ynetnews.com/article/hjnatbkaml" },
    { title: "mako live blog, Netanyahu on Arab parties (28 Oct 2026)", url: "https://www.mako.co.il/news-politics/2026_q4/liveblog-f5b5a09693081a1026.htm" },
    { title: "Israel Hayom, Religious Zionism won't sit with Ra'am (25 Mar 2021)", url: "https://www.israelhayom.com/2021/03/25/religious-zionist-party-says-wont-sit-in-coalition-with-raam/" },
    { title: "Times of Israel, Ben Gvir press conference (19 Oct 2026)", url: "https://www.timesofisrael.com/ben-gvir-says-netanyahu-pledged-to-exclude-him-from-next-government-as-election-nears/" },
  ],
};
