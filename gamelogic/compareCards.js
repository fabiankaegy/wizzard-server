const { VALUES } = require("./general");

const compareCards = (previous, current, trumpColor = false) => {
	const isWizzard = current.value.number === VALUES.Wizzard.number;
	const isPreviousWizzard = previous.value.number === VALUES.Wizzard.number;
	const isTrumpColor = current.color === trumpColor;
	const isSameColor = current.color === previous.color;
	const isLargerValue = current.value.number > previous.value.number;

	if (!isPreviousWizzard && isWizzard) {
		return true;
	}

	if (!isPreviousWizzard && ((isSameColor && isLargerValue) || isTrumpColor)) {
		return true;
	}
	return false;
};

module.exports = compareCards;
