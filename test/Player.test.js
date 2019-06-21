const Player = require("../gamelogic/Player");

describe("Player", () => {
	let Fabian;

	beforeEach(() => {
		Fabian = new Player("Fabian");
	});

	it("calculates correct score for correct predicted stashes", () => {
		Fabian.predict(2);
		Fabian.actual(2);
		expect(Fabian.score).toBe(40);
	});

	it("calculates correct score for too low predicted stashes", () => {
		Fabian.predict(2);
		Fabian.actual(0);
		expect(Fabian.score).toBe(-20);
	});

	it("calculates correct score for too highly predicted stashes", () => {
		Fabian.predict(5);
		Fabian.actual(10);
		expect(Fabian.score).toBe(50);
	});
});
