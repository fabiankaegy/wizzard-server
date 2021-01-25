import Card from "./Card";
import { VALUES } from "./general";

/**
 * compareCards
 *
 * @param {Card} previous card to beat in the comparrison
 * @param {Card} current card that will be compared to the currently best card
 * @param {boolean} [trumpColor=true] color of the current trumpf
 * @returns
 */
export default function compareCards (previous: Card, current: Card, trumpColor: string | boolean = false) {
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
