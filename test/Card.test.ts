import { VALUES, COLORS } from "../gamelogic/general";
import Card from "../gamelogic/Card";
import compareCards from "../gamelogic/compareCards";

describe("Card", () => {
	test("finds larger cards of the same color", () => {
		const redSeven = new Card(COLORS.red, VALUES.Seven);
		const redEight = new Card(COLORS.red, VALUES.Eight);

		const isLarger = compareCards(redSeven, redEight);
		expect(isLarger).toBe(true);
	});

	test("finds smaler cards of the same color", () => {
		const redSeven = new Card(COLORS.red, VALUES.Seven);
		const redEight = new Card(COLORS.red, VALUES.Eight);

		const isLarger = compareCards(redEight, redSeven);
		expect(isLarger).toBe(false);
	});

	test("wizzard wins over everything in same color", () => {
		const redWizzard = new Card(COLORS.red, VALUES.Wizzard);
		const redThirteen = new Card(COLORS.red, VALUES.Thirteen);

		const isLarger = compareCards(redThirteen, redWizzard);
		expect(isLarger).toBe(true);
	});

	test("N looses over everything in same color", () => {
		const redNarr = new Card(COLORS.red, VALUES.Narr);
		const redThirteen = new Card(COLORS.red, VALUES.Thirteen);

		const isLarger = compareCards(redThirteen, redNarr);
		expect(isLarger).toBe(false);
	});

	test("wizzard looses over other wizzard", () => {
		const redWizzard = new Card(COLORS.red, VALUES.Wizzard);

		const isLarger = compareCards(redWizzard, redWizzard);
		expect(isLarger).toBe(false);
	});

	test("wizzard winns over numer from other COLORS", () => {
		const redWizzard = new Card(COLORS.red, VALUES.Wizzard);
		const blueThirteen = new Card(COLORS.blue, VALUES.Thirteen);

		const isLarger = compareCards(blueThirteen, redWizzard);
		expect(isLarger).toBe(true);
	});

	test("trump wins over current color", () => {
		const redOne = new Card(COLORS.red, VALUES.One);
		const blueThirteen = new Card(COLORS.blue, VALUES.Thirteen);

		const isLarger = compareCards(blueThirteen, redOne, COLORS.red);
		expect(isLarger).toBe(true);
	});

	test("trump looses over wizzard", () => {
		const redOne = new Card(COLORS.red, VALUES.One);
		const blueWizzard = new Card(COLORS.blue, VALUES.Wizzard);

		const isLarger = compareCards(blueWizzard, redOne, COLORS.red);
		expect(isLarger).toBe(false);
	});
});
