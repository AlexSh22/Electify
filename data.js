// Election data: questions and party positions.
// Edit this file to adjust questions or positions; no build step needed.
//
// Scale for every position: -2 strongly disagree, -1 disagree, 0 neutral/mixed,
// 1 agree, 2 strongly agree, null = no clear public position (question is skipped
// for that party when scoring).
//
// Positions are editorial summaries of public reporting (see SOURCES.md) and may be
// inaccurate or out of date. Order of `positions` matches the order of `questions`.

window.ELECTION_DATA = {
  election: {
    en: "Knesset election · 27 October 2026",
    he: "הבחירות לכנסת · 27 באוקטובר 2026",
  },
  // Axes for the "political map" chart. Each axis averages the listed question ids;
  // `invert` flips a question's sign so that higher always means the axis's `high` label.
  axes: {
    x: {
      questions: ["palestinian_state", "annexation", "gaza_emigration"],
      invert: ["palestinian_state"],
      low: { en: "Diplomatic", he: "מדיני" },
      high: { en: "Hawkish", he: "ניצי" },
    },
    y: {
      questions: ["haredi_draft", "civil_marriage", "core_curriculum"],
      invert: [],
      low: { en: "Religious-traditional", he: "דתי-מסורתי" },
      high: { en: "Liberal-secular", he: "ליברלי-חילוני" },
    },
  },
  questions: [
    {
      id: "judiciary",
      topic: { en: "Judiciary", he: "מערכת המשפט" },
      en: "The Knesset should be able to override Supreme Court rulings and limit the court's powers.",
      he: "הכנסת צריכה להיות מסוגלת לעקוף פסיקות של בית המשפט העליון ולצמצם את סמכויותיו.",
    },
    {
      id: "haredi_draft",
      topic: { en: "Haredi draft", he: "גיוס חרדים" },
      en: "Yeshiva students should be drafted like everyone else, with sanctions for those who refuse.",
      he: "יש לגייס תלמידי ישיבות כמו כולם, עם סנקציות על מי שמסרב.",
    },
    {
      id: "palestinian_state",
      topic: { en: "Palestinian state", he: "מדינה פלסטינית" },
      en: "Israel should work toward a Palestinian state as part of a long-term agreement.",
      he: "ישראל צריכה לפעול להקמת מדינה פלסטינית במסגרת הסדר ארוך טווח.",
    },
    {
      id: "annexation",
      topic: { en: "Settlements & sovereignty", he: "התיישבות וריבונות" },
      en: "Israel should apply sovereignty to parts of the West Bank and expand settlements.",
      he: "ישראל צריכה להחיל ריבונות על חלקים מיהודה ושומרון ולהרחיב את ההתיישבות.",
    },
    {
      id: "oct7_inquiry",
      topic: { en: "October 7 inquiry", he: "חקירת 7 באוקטובר" },
      en: "An independent state commission of inquiry into October 7 should be established.",
      he: "יש להקים ועדת חקירה ממלכתית עצמאית לאירועי 7 באוקטובר.",
    },
    {
      id: "civil_marriage",
      topic: { en: "Religion & state", he: "דת ומדינה" },
      en: "Civil marriage and public transport on Shabbat should be allowed.",
      he: "יש לאפשר נישואים אזרחיים ותחבורה ציבורית בשבת.",
    },
    {
      id: "gaza_emigration",
      topic: { en: "Gaza's future", he: "עתיד עזה" },
      en: "Israel should encourage Palestinian emigration from Gaza and allow Jewish settlement there.",
      he: "ישראל צריכה לעודד הגירה של פלסטינים מעזה ולאפשר בה התיישבות יהודית.",
    },
    {
      id: "welfare",
      topic: { en: "Economy", he: "כלכלה" },
      en: "The state should expand welfare and public services, even if it means higher taxes.",
      he: "המדינה צריכה להרחיב את הרווחה והשירותים הציבוריים, גם במחיר של מסים גבוהים יותר.",
    },
    {
      id: "arab_partner",
      topic: { en: "Arab parties", he: "מפלגות ערביות" },
      en: "An Arab party, such as Ra'am, can be a legitimate partner in a governing coalition.",
      he: "מפלגה ערבית, כמו רע\"מ, יכולה להיות שותפה לגיטימית בקואליציה.",
    },
    {
      id: "core_curriculum",
      topic: { en: "Education", he: "חינוך" },
      en: "State funding for schools should require core studies such as math and English.",
      he: "מימון ממשלתי לבתי ספר צריך להיות מותנה בלימודי ליבה כמו מתמטיקה ואנגלית.",
    },
  ],
  // `seats` = MEF poll-of-polls average, 7-21 Oct 2026 (used only for bubble size; 0 = below threshold in most polls).
  parties: [
    {
      id: "likud", color: "#2f6fd0", seats: 22,
      name: { en: "Likud", he: "הליכוד" },
      leader: { en: "Benjamin Netanyahu", he: "בנימין נתניהו" },
      positions: [2, -1, -2, 1, -2, 0, 0, -1, -2, -1],
    },
    {
      id: "yashar", color: "#0ea5a4", seats: 22,
      name: { en: "Yashar!", he: "ישר!" },
      leader: { en: "Gadi Eisenkot", he: "גדי איזנקוט" },
      positions: [-2, 2, -1, -1, 2, 1, -2, 0, -1, 1],
    },
    {
      id: "together", color: "#6d5bd0", seats: 13,
      name: { en: "Together", he: "ביחד" },
      leader: { en: "Naftali Bennett & Yair Lapid", he: "נפתלי בנט ויאיר לפיד" },
      positions: [-2, 2, -1, 0, 2, 2, -1, 0, -1, 2],
    },
    {
      id: "democrats", color: "#d63c4a", seats: 10,
      name: { en: "The Democrats", he: "הדמוקרטים" },
      leader: { en: "Yair Golan", he: "יאיר גולן" },
      positions: [-2, 2, 1, -2, 2, 2, -2, 2, 2, 2],
    },
    {
      id: "yisrael_beytenu", color: "#1f8f4e", seats: 8,
      name: { en: "Yisrael Beytenu", he: "ישראל ביתנו" },
      leader: { en: "Avigdor Liberman", he: "אביגדור ליברמן" },
      positions: [-1, 2, -1, 0, 2, 2, -1, -1, -2, 2],
    },
    {
      id: "shas", color: "#1d3557", seats: 8,
      name: { en: "Shas", he: "ש\"ס" },
      leader: { en: "Aryeh Deri", he: "אריה דרעי" },
      positions: [1, -2, null, null, -1, -2, null, 1, -1, -2],
    },
    {
      id: "utj", color: "#3b3b3b", seats: 8,
      name: { en: "United Torah Judaism", he: "יהדות התורה" },
      leader: { en: "Yaakov Asher", he: "יעקב אשר" },
      positions: [2, -2, null, null, -1, -2, null, 1, null, -2],
    },
    {
      id: "rz_zehut", color: "#e08a1e", seats: 7,
      name: { en: "Religious Zionism–Zehut", he: "הציונות הדתית–זהות" },
      leader: { en: "Bezalel Smotrich", he: "בצלאל סמוטריץ'" },
      positions: [2, 0, -2, 2, -1, -2, 2, -1, -2, 0],
    },
    {
      id: "otzma", color: "#b8860b", seats: 8,
      name: { en: "Otzma Yehudit", he: "עוצמה יהודית" },
      leader: { en: "Itamar Ben Gvir", he: "איתמר בן גביר" },
      positions: [2, -1, -2, 2, -1, -2, 2, 0, -2, null],
    },
    {
      id: "joint_list", color: "#2e8b57", seats: 8,
      name: { en: "Joint List", he: "הרשימה המשותפת" },
      leader: { en: "Yousef Jabareen", he: "יוסף ג'בארין" },
      positions: [-2, null, 2, -2, 1, 1, -2, 2, 1, null],
    },
    {
      id: "raam", color: "#4f9d2d", seats: 6,
      name: { en: "Ra'am", he: "רע\"מ" },
      leader: { en: "Mansour Abbas", he: "מנסור עבאס" },
      positions: [-1, null, 2, -2, 1, -1, -2, 1, 2, null],
    },
    {
      id: "amcha", color: "#8c5a3c", seats: 0,
      name: { en: "Amcha Yisrael", he: "עמך ישראל" },
      leader: { en: "Ofer Winter", he: "עופר וינטר" },
      positions: [1, 2, -2, 1, -1, -1, 1, null, -1, 1],
    },
    {
      id: "reservists", color: "#7a8796", seats: 0,
      name: { en: "Reservists–Economic Party", he: "המילואימניקים–הכלכלית" },
      leader: { en: "Yoaz Hendel & Yaron Zelekha", he: "יועז הנדל וירון זליכה" },
      positions: [0, 2, -1, null, 1, 2, -1, 0, -2, 2],
    },
  ],
};
