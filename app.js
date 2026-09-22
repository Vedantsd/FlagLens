window.FlagLens = window.FlagLens || {};

window.FlagLens.state = {
  allQuestions: [],
  selectedQuestions: [],
  currentIndex: 0,
  totalScore: 0,
  badAnswers: [],
  userName: "",
  friendName: "",
  questionsLoaded: false
};

window.FlagLens.App = {
  init: function init() {
    window.FlagLens.UI.cacheDom();
    window.FlagLens.App.bindEvents();
    window.FlagLens.App.loadQuestions();
  },

  getCurrentQuestion: function getCurrentQuestion() {
    return window.FlagLens.state.selectedQuestions[window.FlagLens.state.currentIndex];
  },

  startQuiz: function startQuiz() {
    const ui = window.FlagLens.UI.ui;
    const userName = ui.userNameInput.value.trim();
    const name = ui.friendNameInput.value.trim();

    if (!userName) {
      ui.userNameInput.focus();
      return;
    }
    if (!name) {
      ui.friendNameInput.focus();
      return;
    }

    if (!window.FlagLens.state.questionsLoaded) {
      return;
    }

    window.FlagLens.state.userName = userName;
    window.FlagLens.state.friendName = name;
    window.FlagLens.state.selectedQuestions = window.FlagLens.SCORING.shuffle(window.FlagLens.state.allQuestions).slice(0, Math.min(window.FlagLens.DATA.CONFIG.questionsPerTest, window.FlagLens.state.allQuestions.length));
    window.FlagLens.state.currentIndex = 0;
    window.FlagLens.state.totalScore = 0;
    window.FlagLens.state.badAnswers = [];

    ui.friendDisplay.textContent = window.FlagLens.state.friendName;
    window.FlagLens.UI.showScreen("screen-questions");
    window.FlagLens.UI.renderQuestion(
      window.FlagLens.App.getCurrentQuestion(),
      window.FlagLens.state.selectedQuestions,
      window.FlagLens.state.currentIndex
    );
  },

  handleAnswerSelection: function handleAnswerSelection(choice) {
    const question = window.FlagLens.App.getCurrentQuestion();
    if (!question) {
      return;
    }

    const delta = choice === "yes" ? question.yes : question.no;
    window.FlagLens.state.totalScore += delta;

    const answeredNegative = (question.yes < 0 && choice === "yes") || (question.no < 0 && choice === "no");
    if (answeredNegative) {
      window.FlagLens.state.badAnswers.push(question.q);
    }

    window.FlagLens.state.currentIndex += 1;

    if (window.FlagLens.state.currentIndex < window.FlagLens.state.selectedQuestions.length) {
      window.FlagLens.UI.renderQuestion(
        window.FlagLens.App.getCurrentQuestion(),
        window.FlagLens.state.selectedQuestions,
        window.FlagLens.state.currentIndex
      );
      return;
    }

    window.FlagLens.App.showResult();
  },

  showResult: function showResult() {
    const ui = window.FlagLens.UI.ui;
    ui.progressFill.style.width = "100%";

    const score = window.FlagLens.SCORING.calculateNormalizedScore(window.FlagLens.state.selectedQuestions, window.FlagLens.state.totalScore);
    const verdictData = window.FlagLens.SCORING.getVerdict(score, window.FlagLens.state.friendName);
    const color = window.FlagLens.SCORING.scoreToColor(score);
    const improvements = window.FlagLens.SCORING.getImprovementSuggestions(window.FlagLens.state.badAnswers, window.FlagLens.DATA.CONFIG.suggestionLimit)
      .filter(question => window.FlagLens.DATA.SUGGESTIONS[question]);

    window.FlagLens.UI.showScreen("screen-result");

    const arcPercentage = (score + 1) / 2;
    ui.scoreArc.style.strokeDashoffset = window.FlagLens.DATA.CONFIG.scoreDisplayArcCircumference - arcPercentage * window.FlagLens.DATA.CONFIG.scoreDisplayArcCircumference;
    ui.scoreArc.style.stroke = color;

    setTimeout(() => {
      ui.scoreDisplay.textContent = score.toFixed(2);
      ui.scoreDisplay.style.color = color;
    }, 200);

    window.FlagLens.UI.updateResultUI(
      window.FlagLens.state.userName,
      window.FlagLens.state.friendName,
      score,
      verdictData.verdict,
      verdictData.description,
      color,
      improvements
    );

    const flagStatus = score >= 0 ? "green" : "red";
    window.FlagLens.App.saveResult(score, flagStatus);
  },

  saveResult: function saveResult(score, flagStatus) {
    fetch("/api/save-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: window.FlagLens.state.userName,
        friendName: window.FlagLens.state.friendName,
        score: Number(score.toFixed(2)),
        flagStatus
      })
    }).catch(error => {
      console.warn("Could not save result to database:", error);
    });
  },

  loadQuestions: async function loadQuestions() {
    window.FlagLens.UI.setLoadingState("Loading questions...", true);

    let csvText;
    try {
      csvText = await window.FlagLens.DATA.fetchCSVText();
    } catch (fetchError) {
      console.warn("fetch(questions.csv) failed, falling back to embedded dataset:", fetchError);
      try {
        csvText = window.FlagLens.DATA.readEmbeddedCSVText();
      } catch (fallbackError) {
        console.error("Question loading error:", fetchError, fallbackError);
        window.FlagLens.UI.setLoadingState("Could not load questions.csv.", true);
        return;
      }
    }

    try {
      const parsedQuestions = window.FlagLens.DATA.parseCSV(csvText);
      if (parsedQuestions.length < window.FlagLens.DATA.CONFIG.questionsPerTest) {
        throw new Error(`questions.csv needs at least ${window.FlagLens.DATA.CONFIG.questionsPerTest} valid questions.`);
      }
      window.FlagLens.state.allQuestions = parsedQuestions;
      window.FlagLens.state.questionsLoaded = true;
      window.FlagLens.UI.setLoadingState(`${parsedQuestions.length} questions loaded.`, false);
    } catch (error) {
      console.error("Question parsing error:", error);
      window.FlagLens.UI.setLoadingState("questions.csv is invalid or has too few questions.", true);
    }
  },

  bindEvents: function bindEvents() {
    const ui = window.FlagLens.UI.ui;
    ui.btnStart.addEventListener("click", window.FlagLens.App.startQuiz);
    ui.userNameInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        ui.friendNameInput.focus();
      }
    });
    ui.friendNameInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        ui.btnStart.click();
      }
    });

    ui.btnYes.addEventListener("click", () => window.FlagLens.App.handleAnswerSelection("yes"));
    ui.btnNo.addEventListener("click", () => window.FlagLens.App.handleAnswerSelection("no"));

    ui.btnDownload.addEventListener("click", () => {
      html2canvas(ui.exportCard, {
        backgroundColor: "#0d1520",
        scale: 2,
        useCORS: true,
        logging: false
      }).then(canvas => {
        const link = document.createElement("a");
        const fromSlug = window.FlagLens.state.userName.replace(/\s+/g, "-").toLowerCase();
        const toSlug = window.FlagLens.state.friendName.replace(/\s+/g, "-").toLowerCase();
        link.download = `flaglens-${fromSlug}-to-${toSlug}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    });

    ui.btnRestart.addEventListener("click", () => {
      ui.friendNameInput.value = "";
      window.FlagLens.UI.showScreen("screen-name");
    });
  }
};

window.FlagLens.App.init();
