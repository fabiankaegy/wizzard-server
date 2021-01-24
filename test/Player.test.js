const Player = require("../gamelogic/Player");

describe("Player", () => {
	let Fabian;

	beforeEach(() => {
		Fabian = new Player("Fabian");
	});

	it("calculates correct score for correct predicted stashes", () => {
		Fabian.setPrediction(2);
		Fabian.setActual(2);
		expect(Fabian.score).toBe(40);
	});

	it("calculates correct score for too low predicted stashes", () => {
		Fabian.setPrediction(2);
		Fabian.setActual(0);
		expect(Fabian.score).toBe(-20);
	});

	it("calculates correct score for too highly predicted stashes", () => {
		Fabian.setPrediction(5);
		Fabian.setActual(10);
		expect(Fabian.score).toBe(50);
	});
});
