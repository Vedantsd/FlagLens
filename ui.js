window.FlagLens = window.FlagLens || {};
window.FlagLens.UI = {};
window.FlagLens.UI.ui = {};

window.FlagLens.UI.cacheDom = function cacheDom() {
  const ui = window.FlagLens.UI.ui;
  ui.btnStart = document.getElementById("btn-start");
  ui.userNameInput = document.getElementById("user-name-input");
  ui.friendNameInput = document.getElementById("friend-name-input");
  ui.loadStatus = document.getElementById("load-status");
  ui.friendDisplay = document.getElementById("friend-display");
  ui.questionText = document.getElementById("question-text");
  ui.progressCount = document.getElementById("progress-count");
  ui.progressFill = document.getElementById("progress-fill");
  ui.btnYes = document.getElementById("btn-yes");
  ui.btnNo = document.getElementById("btn-no");
  ui.btnDownload = document.getElementById("btn-download");
  ui.btnRestart = document.getElementById("btn-restart");
  ui.scoreArc = document.getElementById("score-arc");
  ui.scoreDisplay = document.getElementById("score-display");
  ui.resultNameLabel = document.getElementById("result-name-label");
  ui.resultVerdict = document.getElementById("result-verdict");
  ui.resultDesc = document.getElementById("result-desc");
  ui.suggestionsList = document.getElementById("suggestions-list");
  ui.cardName = document.getElementById("card-name");
  ui.cardTopBar = document.getElementById("card-top-bar");
  ui.cardBadge = document.getElementById("card-badge");
  ui.cardScoreChip = document.getElementById("card-score-chip");
  ui.cardSuggestions = document.getElementById("card-suggestions");
  ui.cardDate = document.getElementById("card-date");
  ui.exportCard = document.getElementById("export-card");
};

window.FlagLens.UI.setLoadingState = function setLoadingState(message, isDisabled) {
  const ui = window.FlagLens.UI.ui;
  ui.loadStatus.textContent = message;
  ui.btnStart.disabled = isDisabled;
};

window.FlagLens.UI.showScreen = function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
};

window.FlagLens.UI.renderQuestion = function renderQuestion(question, selectedQuestions, currentIndex) {
  const ui = window.FlagLens.UI.ui;
  const totalQuestions = selectedQuestions.length;

  ui.questionText.textContent = question.q;
  ui.progressCount.textContent = `Question ${currentIndex + 1} of ${totalQuestions}`;
  ui.progressFill.style.width = `${(currentIndex / totalQuestions) * 100}%`;
};

window.FlagLens.UI.renderSuggestionsList = function renderSuggestionsList(improvements) {
  const ui = window.FlagLens.UI.ui;
  ui.suggestionsList.innerHTML = "";

  if (improvements.length === 0) {
    ui.suggestionsList.innerHTML = '<div style="font-size:13px;color:var(--text-muted);font-style:italic;">No significant improvements needed — keep it up.</div>';
    return;
  }

  improvements.forEach(question => {
    const row = document.createElement("div");
    row.className = "suggestion-item";

    const dot = document.createElement("div");
    dot.className = "suggestion-dot";

    const text = document.createElement("span");
    text.textContent = window.FlagLens.DATA.SUGGESTIONS[question];

    row.appendChild(dot);
    row.appendChild(text);
    ui.suggestionsList.appendChild(row);
  });
};

window.FlagLens.UI.buildCard = function buildCard(friendName, score, verdict, color, improvements) {
  const ui = window.FlagLens.UI.ui;
  ui.cardName.textContent = friendName;
  ui.cardTopBar.style.background = `linear-gradient(90deg, ${color}, transparent)`;
  ui.cardBadge.textContent = verdict;

  const isRed = score < -0.1;
  ui.cardBadge.style.background = isRed ? "rgba(224,53,53,0.15)" : score < 0.1 ? "rgba(245,245,245,0.1)" : "rgba(45,181,110,0.15)";
  ui.cardBadge.style.color = color;
  ui.cardBadge.style.border = `1px solid ${color}30`;

  ui.cardScoreChip.textContent = `Score: ${score.toFixed(2)}`;
  ui.cardSuggestions.innerHTML = "";

  if (improvements.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "card-no-suggestions";
    emptyState.textContent = "No significant improvements needed.";
    ui.cardSuggestions.appendChild(emptyState);
  } else {
    improvements.forEach(question => {
      const row = document.createElement("div");
      row.className = "card-suggestion-row";

      const dot = document.createElement("div");
      dot.className = "card-suggestion-dot";

      const text = document.createElement("span");
      text.className = "card-suggestion-text";
      text.textContent = window.FlagLens.DATA.SUGGESTIONS[question];

      row.appendChild(dot);
      row.appendChild(text);
      ui.cardSuggestions.appendChild(row);
    });
  }

  const now = new Date();
  ui.cardDate.textContent = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

window.FlagLens.UI.updateResultUI = function updateResultUI(friendName, score, verdict, description, color, improvements) {
  const ui = window.FlagLens.UI.ui;
  ui.resultNameLabel.textContent = friendName;
  ui.resultVerdict.textContent = verdict;
  ui.resultVerdict.style.color = color;
  ui.resultDesc.textContent = description;
  window.FlagLens.UI.renderSuggestionsList(improvements);
  window.FlagLens.UI.buildCard(friendName, score, verdict, color, improvements);
};
