window.FlagLens = window.FlagLens || {};
window.FlagLens.SCORING = {};

window.FlagLens.SCORING.shuffle = function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
};

window.FlagLens.SCORING.scoreToColor = function scoreToColor(score) {
  const boundedScore = Math.max(-1, Math.min(1, score));

  if (boundedScore >= 0) {
    const red = Math.round(245 - (245 - 45) * boundedScore);
    const greenValue = Math.round(245 - (245 - 181) * boundedScore);
    const blueValue = Math.round(245 - (245 - 110) * boundedScore);
    return `rgb(${red},${greenValue},${blueValue})`;
  }

  const t = -boundedScore;
  const red = Math.round(245 - (245 - 224) * t);
  const greenValue = Math.round(245 - 245 * t);
  const blueValue = Math.round(245 - 245 * t);
  return `rgb(${red},${greenValue},${blueValue})`;
};

window.FlagLens.SCORING.calculateNormalizedScore = function calculateNormalizedScore(selectedQuestions, totalScore) {
  const maxPossible = selectedQuestions.reduce((total, question) => total + Math.max(question.yes, question.no), 0);
  const minPossible = selectedQuestions.reduce((total, question) => total + Math.min(question.yes, question.no), 0);
  const normalized = (totalScore - minPossible) / (maxPossible - minPossible) * 2 - 1;
  return Math.max(-1, Math.min(1, normalized));
};

window.FlagLens.SCORING.getImprovementSuggestions = function getImprovementSuggestions(badAnswers, suggestionLimit) {
  const seen = new Set();
  const suggestions = [];

  for (const question of badAnswers) {
    if (!question || seen.has(question)) {
      continue;
    }
    seen.add(question);
    suggestions.push(question);
    if (suggestions.length >= suggestionLimit) {
      break;
    }
  }

  return suggestions;
};

window.FlagLens.SCORING.getVerdict = function getVerdict(score, friendName) {
  if (score >= 0.5) {
    return {
      verdict: "Green Flag",
      description: `${friendName} shows strong, positive habits across the board. A reliable presence in your life.`
    };
  }
  if (score >= 0.1) {
    return {
      verdict: "Mostly Green",
      description: `${friendName} has more positive habits than not, with a few areas that could use attention.`
    };
  }
  if (score >= -0.1) {
    return {
      verdict: "Neutral",
      description: `${friendName} sits in the middle — a balanced mix of habits, with clear room to grow.`
    };
  }
  if (score >= -0.5) {
    return {
      verdict: "Mostly Red",
      description: `${friendName} has a pattern of habits that may cause concern over time. Growth is possible.`
    };
  }

  return {
    verdict: "Red Flag",
    description: `${friendName}'s current habits indicate significant areas of concern worth discussing openly.`
  };
};
