import Wizzard from "../gamelogic/Wizzard";
import Player from '../gamelogic/Player';

describe("Deck", () => {
	let myGame: Wizzard;

	beforeEach(() => {
		myGame = new Wizzard([new Player({name: "Fabian"}), new Player({name: "Moritz"}), new Player({name: "Bea"}), new Player({name: "Michel"})]);
	});

	test("Player count works", () => {
		expect(myGame.player).toBe(4);
	});

	test("has method to reorder players", () => {
		const firstBefore = myGame.players[0];
		const seccondBefore = myGame.players[1];
		myGame.movePlayerIndex();
		const lastAfter = myGame.players[myGame.player - 1];
		const firstAfter = myGame.players[0];

		expect(firstBefore).toBe(lastAfter);
		expect(seccondBefore).toBe(firstAfter);
	});
});
