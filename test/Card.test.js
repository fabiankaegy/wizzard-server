const { values, colors } = require("../gamelogic/general");
const Card = require("../gamelogic/Card");
const compareCards = require("../gamelogic/compareCards");

describe("Card", () => {
	it("finds larger cards of the same color", () => {
		const redSeven = new Card(colors.red, values[7]);
		const redEight = new Card(colors.red, values[8]);

		const isLarger = compareCards(redSeven, redEight);
		expect(isLarger).toBe(true);
	});

	it("finds smaler cards of the same color", () => {
		const redSeven = new Card(colors.red, values[7]);
		const redEight = new Card(colors.red, values[8]);

		const isLarger = compareCards(redEight, redSeven);
		expect(isLarger).toBe(false);
	});

	it("wizzard wins over everything in same color", () => {
		const redWizzard = new Card(colors.red, values.Wizzard);
		const redThirteen = new Card(colors.red, values[13]);

		const isLarger = compareCards(redThirteen, redWizzard);
		expect(isLarger).toBe(true);
	});

	it("N looses over everything in same color", () => {
		const redNarr = new Card(colors.red, values.Narr);
		const redThirteen = new Card(colors.red, values[13]);

		const isLarger = compareCards(redThirteen, redNarr);
		expect(isLarger).toBe(false);
	});

	it("wizzard looses over other wizzard", () => {
		const redWizzard = new Card(colors.red, values.Wizzard);

		const isLarger = compareCards(redWizzard, redWizzard);
		expect(isLarger).toBe(false);
	});

	it("wizzard winns over numer from other colors", () => {
		const redWizzard = new Card(colors.red, values.Wizzard);
		const blueThirteen = new Card(colors.blue, values[13]);

		const isLarger = compareCards(blueThirteen, redWizzard);
		expect(isLarger).toBe(true);
	});

	it("trump wins over current color", () => {
		const redOne = new Card(colors.red, values[1]);
		const blueThirteen = new Card(colors.blue, values[13]);

		const isLarger = compareCards(blueThirteen, redOne, colors.red);
		expect(isLarger).toBe(true);
	});

	it("trump looses over wizzard", () => {
		const redOne = new Card(colors.red, values[1]);
		const blueWizzard = new Card(colors.blue, values.Wizzard);

		const isLarger = compareCards(blueWizzard, redOne, colors.red);
		expect(isLarger).toBe(false);
	});
});
