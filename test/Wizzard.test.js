const Wizzard = require("../gamelogic/Wizzard");
const Player = require('../gamelogic/Player');

describe("Deck", () => {
	let myGame;

	beforeEach(() => {
		myGame = new Wizzard([new Player("Fabian"), new Player("Moritz"), new Player("Bea"), new Player("Michel")]);
	});

	it("Player count works", () => {
		expect(myGame.player).toBe(4);
	});

	it("has method to reorder players", () => {
		const firstBefore = myGame.players[0];
		const seccondBefore = myGame.players[1];
		myGame.movePlayerIndex();
		const lastAfter = myGame.players[myGame.player - 1];
		const firstAfter = myGame.players[0];

		expect(firstBefore).toBe(lastAfter);
		expect(seccondBefore).toBe(firstAfter);
	});
});
