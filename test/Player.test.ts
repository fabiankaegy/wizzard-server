import Player from "../gamelogic/Player";

describe("Player", () => {
	let Fabian: Player;

	beforeEach(() => {
		Fabian = new Player({name:"Fabian"});
	});

	it("calculates correct score for correct predicted stashes", () => {
		Fabian.setPrediction(2);
		Fabian.increaseWins(2)
		Fabian.calculateScore();
		expect(Fabian.score).toBe(40);
	});

	it("calculates correct score for too low predicted stashes", () => {
		Fabian.setPrediction(2);
		expect(Fabian.score).toBe(0);
	});

	it("calculates correct score for too highly predicted stashes", () => {
		Fabian.setPrediction(5);
		Fabian.increaseWins(6)
		Fabian.calculateScore();
		expect(Fabian.score).toBe(50);
	});

	it("recognizes all kinds of predictions", () => {
		Fabian.setPrediction(0);
		expect(Fabian.hasPrediction).toBe(true);

		// reset prediction
		Fabian.prediction = undefined;

		Fabian.setPrediction(2);
		expect(Fabian.hasPrediction).toBe(true);
	})
});
