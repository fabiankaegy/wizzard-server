const { VALUES, COLORS } = require("../gamelogic/general");
const Card = require("../gamelogic/Card");
const compareCards = require("../gamelogic/compareCards");

describe("Card", () => {
	it("finds larger cards of the same color", () => {
		const redSeven = new Card(COLORS.red, VALUES[7]);
		const redEight = new Card(COLORS.red, VALUES[8]);

		const isLarger = compareCards(redSeven, redEight);
		expect(isLarger).toBe(true);
	});

	it("finds smaler cards of the same color", () => {
		const redSeven = new Card(COLORS.red, VALUES[7]);
		const redEight = new Card(COLORS.red, VALUES[8]);

		const isLarger = compareCards(redEight, redSeven);
		expect(isLarger).toBe(false);
	});

	it("wizzard wins over everything in same color", () => {
		const redWizzard = new Card(COLORS.red, VALUES.Wizzard);
		const redThirteen = new Card(COLORS.red, VALUES[13]);

		const isLarger = compareCards(redThirteen, redWizzard);
		expect(isLarger).toBe(true);
	});

	it("N looses over everything in same color", () => {
		const redNarr = new Card(COLORS.red, VALUES.Narr);
		const redThirteen = new Card(COLORS.red, VALUES[13]);

		const isLarger = compareCards(redThirteen, redNarr);
		expect(isLarger).toBe(false);
	});

	it("wizzard looses over other wizzard", () => {
		const redWizzard = new Card(COLORS.red, VALUES.Wizzard);

		const isLarger = compareCards(redWizzard, redWizzard);
		expect(isLarger).toBe(false);
	});

	it("wizzard winns over numer from other COLORS", () => {
		const redWizzard = new Card(COLORS.red, VALUES.Wizzard);
		const blueThirteen = new Card(COLORS.blue, VALUES[13]);

		const isLarger = compareCards(blueThirteen, redWizzard);
		expect(isLarger).toBe(true);
	});

	it("trump wins over current color", () => {
		const redOne = new Card(COLORS.red, VALUES[1]);
		const blueThirteen = new Card(COLORS.blue, VALUES[13]);

		const isLarger = compareCards(blueThirteen, redOne, COLORS.red);
		expect(isLarger).toBe(true);
	});

	it("trump looses over wizzard", () => {
		const redOne = new Card(COLORS.red, VALUES[1]);
		const blueWizzard = new Card(COLORS.blue, VALUES.Wizzard);

		const isLarger = compareCards(blueWizzard, redOne, COLORS.red);
		expect(isLarger).toBe(false);
	});
});
