import Player from "../gamelogic/Player";
import Deck from '../gamelogic/Deck';

describe("Player", () => {
	let Fabian: Player;

	beforeEach(() => {
		Fabian = new Player({name:"Fabian"});
	});

	test("calculates correct score for correct predicted stashes", () => {
		Fabian.setPrediction(2);
		Fabian.increaseWins(2)
		Fabian.calculateScore();
		expect(Fabian.score).toBe(40);
	});

	test("calculates correct score for too low predicted stashes", () => {
		Fabian.setPrediction(2);
		expect(Fabian.score).toBe(0);
	});

	test("calculates correct score for too highly predicted stashes", () => {
		Fabian.setPrediction(5);
		Fabian.increaseWins(6)
		Fabian.calculateScore();
		expect(Fabian.score).toBe(50);
	});

	test("recognizes all kinds of predictions", () => {
		Fabian.setPrediction(0);
		expect(Fabian.hasPrediction).toBe(true);

		// reset prediction
		Fabian.prediction = undefined;

		Fabian.setPrediction(2);
		expect(Fabian.hasPrediction).toBe(true);
	})

	test( "player can draw cards", () => {
		const testDeck = new Deck();
		Fabian.setCards( testDeck.drawCards( 5 ) );
		expect( Fabian.cards?.length ).toBe( 5 );
	} )
	
	test( "player can draw play card", () => {
		const testDeck = new Deck();
		Fabian.setCards( testDeck.drawCards( 5 ) );
		expect( Fabian.cards?.length ).toBe( 5 );
		
		const card = Fabian.playCard(0);
		
		expect( card ).toHaveProperty( 'name' );
		expect( Fabian.cards?.length ).toBe( 4 );
	} )
	
	test( "can find player card index", () => {
		const testDeck = new Deck();
		Fabian.setCards( testDeck.drawCards( 5 ) );

		const card = Fabian.cards![3];
		
		const cardIndex = Fabian.findCardIndex( Fabian.cards![3] );
		const playedCard = Fabian.playCard( cardIndex );
		expect( cardIndex ).toBe( 3 );
		expect( card ).toBe( playedCard );
	} )
});
