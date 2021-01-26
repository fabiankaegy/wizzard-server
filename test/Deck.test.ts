import Deck from "../gamelogic/Deck";

describe("Deck", () => {
	let myDeck: Deck;

	beforeEach(() => {
		myDeck = new Deck();
	});

	it("has a working shuffle method", () => {
		const preShuffle = [...myDeck.cards];

		myDeck.shuffle();

		const firstCard = myDeck.cards[0].name !== preShuffle[0].name;
		const seccondCard = myDeck.cards[1].name !== preShuffle[1].name;
		const eleventhCard = myDeck.cards[10].name !== preShuffle[10].name;
		const sixtiethCard = myDeck.cards[59].name !== preShuffle[59].name;

		const conditioin = firstCard || seccondCard || eleventhCard || sixtiethCard;

		expect(conditioin).toBe(true);
	});

	it("can draw cards", () => {
		const initialAmount = myDeck.remainingCards;
		const amount = 5;
		
		myDeck.drawCards(amount);

		expect(initialAmount - amount).toBe(myDeck.remainingCards);
	});
});
