let ALL_QUESTIONS = [];
const QUESTIONS_PER_TEST = 10;
let questionsLoaded = false;

const SUGGESTIONS = {
  "Do you drink alcohol?": "Consider moderating or eliminating alcohol consumption for better long-term health.",
  "Do you smoke cigarettes or tobacco?": "Quitting smoking significantly improves health outcomes and quality of life.",
  "Do you exercise regularly?": "Aim for at least 30 minutes of moderate exercise most days of the week.",
  "Do you maintain a regular sleep schedule?": "Try going to bed and waking at consistent times to improve sleep quality.",
  "Do you frequently stay up very late without necessity?": "Establish a wind-down routine and prioritize a consistent sleep time.",
  "Do you eat a balanced diet?": "Incorporate more whole foods, vegetables, and reduce processed food intake.",
  "Do you frequently eat junk food?": "Try replacing some processed foods with nutritious whole-food alternatives.",
  "Do you drink enough water every day?": "Keep water easily accessible and build regular hydration into your daily routine.",
  "Do you procrastinate important tasks?": "Break large tasks into smaller steps and address high-priority items first.",
  "Do you complete tasks before their deadlines?": "Continue planning ahead and maintaining your reliable work habits.",
  "Do you maintain a daily routine?": "Maintain a consistent routine while leaving some flexibility for unexpected events.",
  "Do you frequently arrive late to appointments?": "Plan extra travel and preparation time so you can arrive consistently on time.",
  "Do you keep your promises?": "Reliability is foundational — only commit to what you can genuinely follow through on.",
  "Do you lie to avoid responsibility?": "Practice being honest about mistakes and taking responsibility for your actions.",
  "Do you admit your mistakes?": "Continue acknowledging mistakes and using them as opportunities to improve.",
  "Do you blame others for your mistakes?": "Focus on identifying your own role in a situation before assigning responsibility elsewhere.",
  "Do you apologize when you hurt someone?": "Continue taking responsibility and offering sincere apologies when appropriate.",
  "Do you hold grudges for a long time?": "Try processing conflicts and moving forward rather than holding onto resentment.",
  "Do you forgive people who genuinely apologize?": "Continue practicing forgiveness while maintaining healthy boundaries.",
  "Do you intentionally manipulate people to get what you want?": "Practice communicating your needs honestly instead of manipulating others.",
  "Do you help people without expecting something in return?": "Continue helping others while also maintaining appropriate personal boundaries.",
  "Do you make fun of people because of their weaknesses?": "Try replacing criticism or mockery with empathy and constructive communication.",
  "Do you respect people with opinions different from yours?": "Continue listening to different perspectives without needing to agree with them.",
  "Do you frequently judge people based on their appearance?": "Try focusing more on people's actions and character than their appearance.",
  "Do you gossip about your friends or colleagues?": "Redirect conversations toward constructive topics rather than other people's personal lives.",
  "Do you keep other people's secrets?": "Continue respecting people's privacy and trust.",
  "Do you interrupt people while they are speaking?": "Practice allowing people to finish their thoughts before responding.",
  "Do you actively listen when someone talks to you?": "Practice giving full attention in conversations and putting away distractions.",
  "Do you express gratitude when someone helps you?": "Continue acknowledging and appreciating the efforts of people around you.",
  "Do you frequently compare yourself with others?": "Focus on your own progress rather than constantly comparing yourself with others.",
  "Do you celebrate other people's achievements?": "Continue supporting and celebrating the successes of people around you.",
  "Do you become jealous when someone close to you succeeds?": "Try using other people's success as inspiration rather than a reason for comparison.",
  "Do you respect personal boundaries?": "Continue respecting people's physical, emotional, and personal boundaries.",
  "Do you invade other people's privacy?": "Respect people's privacy and ask for permission before accessing personal information.",
  "Do you check your partner's phone without permission?": "Build trust through open communication rather than monitoring private information.",
  "Do you communicate openly when you have a problem with someone?": "Continue addressing interpersonal problems through honest and respectful communication.",
  "Do you avoid difficult conversations even when necessary?": "Address conflicts early — avoidance can allow small issues to become larger problems.",
  "Do you lose your temper easily?": "Practice pausing and using calming techniques before reacting emotionally.",
  "Do you think before reacting when you are angry?": "Continue giving yourself time to think before responding during conflicts.",
  "Do you intentionally hurt people during arguments?": "Focus on resolving disagreements without deliberately attacking or hurting others.",
  "Do you accept constructive criticism?": "Continue treating constructive criticism as an opportunity for growth.",
  "Do you become defensive when someone criticizes you?": "Try listening to criticism before reacting defensively and consider whether it contains useful feedback.",
  "Do you actively try to improve yourself?": "Continue setting personal goals and looking for opportunities to grow.",
  "Do you give up easily when something becomes difficult?": "Break difficult goals into smaller steps and focus on making consistent progress.",
  "Do you learn from your past mistakes?": "Continue reflecting on past experiences and applying those lessons to future decisions.",
  "Do you make decisions impulsively without considering consequences?": "Pause before major decisions and consider their possible short- and long-term consequences.",
  "Do you think about the consequences of your actions?": "Continue considering how your actions may affect yourself and others.",
  "Do you keep track of your spending?": "Continue monitoring your spending and maintaining a realistic budget.",
  "Do you frequently spend money impulsively?": "Consider setting spending limits and waiting before making unnecessary purchases.",
  "Do you regularly save a portion of your income?": "Continue building a consistent savings habit.",
  "Do you borrow money without making an effort to repay it?": "Keep track of financial commitments and prioritize repaying borrowed money.",
  "Do you respect other people's time?": "Continue being punctual and considerate of other people's schedules.",
  "Do you frequently cancel plans at the last minute?": "Respect other people's time by only committing to plans you are likely to keep.",
  "Do you take responsibility for your commitments?": "Continue following through on responsibilities and communicating early if circumstances change.",
  "Do you treat service workers respectfully?": "Continue treating everyone with basic courtesy and respect regardless of their role.",
  "Are you rude to people when you believe they are less important than you?": "Practice treating people respectfully regardless of their social position.",
  "Do you offer help when you see someone genuinely struggling?": "Continue helping others when you can do so safely and appropriately.",
  "Do you volunteer your time for social causes?": "Continue contributing your time and skills to causes you genuinely care about.",
  "Do you respect animals and treat them kindly?": "Continue treating animals with care and compassion.",
  "Do you intentionally damage public property?": "Respect shared spaces and public property.",
  "Do you follow rules even when nobody is watching?": "Continue maintaining your principles even when there is no external pressure.",
  "Do you cheat when you believe you will not get caught?": "Practice acting with integrity even when there are no immediate consequences.",
  "Do you take credit for someone else's work?": "Acknowledge the contributions of others and give credit where it is due.",
  "Do you acknowledge other people's contributions?": "Continue recognizing and appreciating other people's work.",
  "Do you respect commitments made to your friends?": "Continue being dependable and communicating honestly with your friends.",
  "Do you intentionally exclude people from a group?": "Try creating more inclusive environments where appropriate.",
  "Do you try to make new people feel welcome?": "Continue helping new people feel comfortable and included.",
  "Do you enjoy helping your friends achieve their goals?": "Continue supporting your friends while respecting their independence.",
  "Do you use someone's personal information against them?": "Respect personal information and avoid using someone's vulnerability against them.",
  "Do you respect someone's no without pressuring them?": "Continue respecting other people's boundaries and decisions.",
  "Do you frequently seek attention from others?": "Try building confidence and satisfaction that does not depend entirely on external attention.",
  "Do you need constant validation from other people?": "Work on developing internal confidence and self-validation.",
  "Can you be happy for someone without receiving recognition yourself?": "Continue celebrating others without needing personal recognition.",
  "Do you stay calm when plans suddenly change?": "Continue developing flexibility when unexpected situations occur.",
  "Do you frequently overreact to small problems?": "Try pausing and assessing the actual importance of a situation before reacting.",
  "Do you treat people differently based on their social status?": "Practice treating people with equal respect regardless of their status.",
  "Do you give people a second chance after genuine mistakes?": "Continue balancing forgiveness with healthy personal boundaries.",
  "Do you deliberately create conflicts between people?": "Avoid intentionally creating interpersonal conflict and focus on constructive communication.",
  "Do you encourage people around you to grow?": "Continue supporting the development and goals of people around you.",
  "Do you genuinely care about the wellbeing of people close to you?": "Continue showing care through consistent and respectful actions."
};

let friendName = "";
let selectedQuestions = [];
let currentIndex = 0;
let totalScore = 0;
let badAnswers = [];

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      field = "";
      if (row.some(value => value.trim() !== "")) rows.push(row);
      row = [];
    } else {
      field += char;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    if (row.some(value => value.trim() !== "")) rows.push(row);
  }
  if (rows.length === 0) throw new Error("questions.csv is empty.");
  const headers = rows.shift().map(header => header.trim().toLowerCase());
  const questionIndex = headers.indexOf("question");
  const yesIndex = headers.indexOf("score if yes");
  const noIndex = headers.indexOf("score if no");
  if (questionIndex === -1 || yesIndex === -1 || noIndex === -1) {
    throw new Error("questions.csv must contain: Question,score if yes,score if no");
  }
  return rows.map(row => ({
    q: row[questionIndex]?.trim(),
    yes: Number(row[yesIndex]),
    no: Number(row[noIndex])
  })).filter(question => question.q && Number.isFinite(question.yes) && Number.isFinite(question.no));
}

async function fetchCSVText() {
  // Primary path: fetch the dataset file directly (works when the project
  // is served over http/https, e.g. via a local web server).
  const response = await fetch("questions.csv", { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

function readEmbeddedCSVText() {
  // Fallback path: some browsers block fetch() for local files opened
  // directly (file://), so the same dataset is also embedded as a plain
  // text block in index.html. It's still the CSV dataset, not a
  // hardcoded list of questions in JS - just an alternate way to reach it.
  const el = document.getElementById("questions-data");
  if (!el) throw new Error("No embedded questions-data fallback found.");
  return el.textContent;
}

async function loadQuestions() {
  const status = document.getElementById("load-status");
  status.textContent = "Loading questions...";
  document.getElementById("btn-start").disabled = true;

  let csvText;
  try {
    csvText = await fetchCSVText();
  } catch (fetchError) {
    console.warn("fetch(questions.csv) failed, falling back to embedded dataset:", fetchError);
    try {
      csvText = readEmbeddedCSVText();
    } catch (fallbackError) {
      console.error("Question loading error:", fetchError, fallbackError);
      status.textContent = "Could not load questions.csv.";
      document.getElementById("btn-start").disabled = true;
      return;
    }
  }

  try {
    ALL_QUESTIONS = parseCSV(csvText);
    if (ALL_QUESTIONS.length < QUESTIONS_PER_TEST) {
      throw new Error(`questions.csv needs at least ${QUESTIONS_PER_TEST} valid questions.`);
    }
    questionsLoaded = true;
    status.textContent = `${ALL_QUESTIONS.length} questions loaded.`;
    document.getElementById("btn-start").disabled = false;
  } catch (parseError) {
    console.error("Question parsing error:", parseError);
    status.textContent = "questions.csv is invalid or has too few questions.";
    document.getElementById("btn-start").disabled = true;
  }
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function scoreToColor(score) {
  const s = Math.max(-1, Math.min(1, score));
  if (s >= 0) {
    const r = Math.round(245 - (245 - 45) * s);
    const g = Math.round(245 - (245 - 181) * s);
    const b = Math.round(245 - (245 - 110) * s);
    return `rgb(${r},${g},${b})`;
  } else {
    const t = -s;
    const r = Math.round(245 - (245 - 224) * t);
    const g = Math.round(245 - 245 * t);
    const b = Math.round(245 - 245 * t);
    return `rgb(${r},${g},${b})`;
  }
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function loadQuestion() {
  const q = selectedQuestions[currentIndex];
  const total = selectedQuestions.length;
  document.getElementById("question-text").textContent = q.q;
  document.getElementById("progress-count").textContent = `Question ${currentIndex + 1} of ${total}`;
  document.getElementById("progress-fill").style.width = `${(currentIndex / total) * 100}%`;
}

function answer(choice) {
  const q = selectedQuestions[currentIndex];
  const delta = choice === "yes" ? q.yes : q.no;
  totalScore += delta;
  if ((q.yes < 0 && choice === "yes") || (q.no < 0 && choice === "no")) {
    badAnswers.push(q.q);
  }
  currentIndex++;
  if (currentIndex < selectedQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("progress-fill").style.width = "100%";
  const maxPossible = selectedQuestions.reduce((sum, q) => sum + Math.max(q.yes, q.no), 0);
  const minPossible = selectedQuestions.reduce((sum, q) => sum + Math.min(q.yes, q.no), 0);
  const normalized = (totalScore - minPossible) / (maxPossible - minPossible) * 2 - 1;
  const clamped = Math.max(-1, Math.min(1, normalized));
  showScreen("screen-result");
  document.getElementById("result-name-label").textContent = friendName;
  const color = scoreToColor(clamped);
  const arc = document.getElementById("score-arc");
  const circumference = 314;
  const pct = (clamped + 1) / 2;
  arc.style.strokeDashoffset = circumference - pct * circumference;
  arc.style.stroke = color;
  setTimeout(() => {
    document.getElementById("score-display").textContent = clamped.toFixed(2);
    document.getElementById("score-display").style.color = color;
  }, 200);
  let verdict;
  let desc;
  if (clamped >= 0.5) {
    verdict = "Green Flag";
    desc = `${friendName} shows strong, positive habits across the board. A reliable presence in your life.`;
  } else if (clamped >= 0.1) {
    verdict = "Mostly Green";
    desc = `${friendName} has more positive habits than not, with a few areas that could use attention.`;
  } else if (clamped >= -0.1) {
    verdict = "Neutral";
    desc = `${friendName} sits in the middle — a balanced mix of habits, with clear room to grow.`;
  } else if (clamped >= -0.5) {
    verdict = "Mostly Red";
    desc = `${friendName} has a pattern of habits that may cause concern over time. Growth is possible.`;
  } else {
    verdict = "Red Flag";
    desc = `${friendName}'s current habits indicate significant areas of concern worth discussing openly.`;
  }
  const verdictEl = document.getElementById("result-verdict");
  verdictEl.textContent = verdict;
  verdictEl.style.color = color;
  document.getElementById("result-desc").textContent = desc;
  const listEl = document.getElementById("suggestions-list");
  listEl.innerHTML = "";
  const improvements = badAnswers.filter(q => SUGGESTIONS[q]).slice(0, 4);
  if (improvements.length === 0) {
    listEl.innerHTML = `<div style="font-size:13px;color:var(--text-muted);font-style:italic;">No significant improvements needed — keep it up.</div>`;
  } else {
    improvements.forEach(q => {
      const row = document.createElement("div");
      row.className = "suggestion-item";
      const dot = document.createElement("div");
      dot.className = "suggestion-dot";
      const text = document.createElement("span");
      text.textContent = SUGGESTIONS[q];
      row.appendChild(dot);
      row.appendChild(text);
      listEl.appendChild(row);
    });
  }
  buildCard(clamped, verdict, color, improvements);
}

function buildCard(score, verdict, color, improvements) {
  document.getElementById("card-name").textContent = friendName;
  document.getElementById("card-top-bar").style.background = `linear-gradient(90deg, ${color}, transparent)`;
  const badge = document.getElementById("card-badge");
  badge.textContent = verdict;
  const isRed = score < -0.1;
  badge.style.background = isRed ? "rgba(224,53,53,0.15)" : score < 0.1 ? "rgba(245,245,245,0.1)" : "rgba(45,181,110,0.15)";
  badge.style.color = color;
  badge.style.border = `1px solid ${color}30`;
  document.getElementById("card-score-chip").textContent = `Score: ${score.toFixed(2)}`;
  const cs = document.getElementById("card-suggestions");
  cs.innerHTML = "";
  if (improvements.length === 0) {
    const el = document.createElement("div");
    el.className = "card-no-suggestions";
    el.textContent = "No significant improvements needed.";
    cs.appendChild(el);
  } else {
    improvements.forEach(q => {
      const row = document.createElement("div");
      row.className = "card-suggestion-row";
      const dot = document.createElement("div");
      dot.className = "card-suggestion-dot";
      const text = document.createElement("span");
      text.className = "card-suggestion-text";
      text.textContent = SUGGESTIONS[q];
      row.appendChild(dot);
      row.appendChild(text);
      cs.appendChild(row);
    });
  }
  const now = new Date();
  document.getElementById("card-date").textContent = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

document.getElementById("btn-start").addEventListener("click", () => {
  const val = document.getElementById("friend-name-input").value.trim();
  if (!val) {
    document.getElementById("friend-name-input").focus();
    return;
  }
  if (!questionsLoaded) return;
  friendName = val;
  selectedQuestions = shuffle(ALL_QUESTIONS).slice(0, Math.min(QUESTIONS_PER_TEST, ALL_QUESTIONS.length));
  currentIndex = 0;
  totalScore = 0;
  badAnswers = [];
  document.getElementById("friend-display").textContent = friendName;
  showScreen("screen-questions");
  loadQuestion();
});

document.getElementById("friend-name-input").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    document.getElementById("btn-start").click();
  }
});

document.getElementById("btn-yes").addEventListener("click", () => answer("yes"));
document.getElementById("btn-no").addEventListener("click", () => answer("no"));

document.getElementById("btn-download").addEventListener("click", () => {
  const card = document.getElementById("export-card");
  html2canvas(card, {
    backgroundColor: "#0d1520",
    scale: 2,
    useCORS: true,
    logging: false
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = `flaglens-${friendName.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

document.getElementById("btn-restart").addEventListener("click", () => {
  document.getElementById("friend-name-input").value = "";
  showScreen("screen-name");
});

loadQuestions();