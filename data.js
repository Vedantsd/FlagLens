window.FlagLens = window.FlagLens || {};

window.FlagLens.DATA = {
  CONFIG: {
    questionsPerTest: 10,
    suggestionLimit: 4,
    scoreDisplayArcCircumference: 314,
    exportCardId: "export-card",
    questionDataId: "questions-data"
  },

  SUGGESTIONS: {
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
  }
};

window.FlagLens.DATA.parseCSV = function parseCSV(csvText) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const next = csvText[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(field);
      field = "";
      if (row.some(value => value.trim() !== "")) {
        rows.push(row);
      }
      row = [];
    } else {
      field += char;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    if (row.some(value => value.trim() !== "")) {
      rows.push(row);
    }
  }

  if (rows.length === 0) {
    throw new Error("questions.csv is empty.");
  }

  const headers = rows.shift().map(header => header.trim().toLowerCase());
  const questionIndex = headers.indexOf("question");
  const yesIndex = headers.indexOf("score if yes");
  const noIndex = headers.indexOf("score if no");

  if (questionIndex === -1 || yesIndex === -1 || noIndex === -1) {
    throw new Error("questions.csv must contain: Question,score if yes,score if no");
  }

  return rows
    .map(rowData => ({
      q: rowData[questionIndex]?.trim(),
      yes: Number(rowData[yesIndex]),
      no: Number(rowData[noIndex])
    }))
    .filter(question => question.q && Number.isFinite(question.yes) && Number.isFinite(question.no));
};

window.FlagLens.DATA.fetchCSVText = async function fetchCSVText() {
  const response = await fetch("questions.csv", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.text();
};

window.FlagLens.DATA.readEmbeddedCSVText = function readEmbeddedCSVText() {
  const embedded = document.getElementById(window.FlagLens.DATA.CONFIG.questionDataId);
  if (!embedded) {
    throw new Error("No embedded questions-data fallback found.");
  }
  return embedded.textContent;
};