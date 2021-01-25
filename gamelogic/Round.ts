import Wizzard from "./Wizzard";
import Card from "./Card";

/**
 * Round
 * 
 * A representation of initial game rounds
 *
 * @class Round
 */
export default class Round {

	game: Wizzard;
	number: number = 0;
	trumpf?: Card;

    /**
	 * Creates an instance of Round.
	 * @param {Wizzard} game game instance
	 * @memberof Round
	 */
	constructor(game: Wizzard) {
        this.game = game;

        this.start();
    }

    /**
	 * start
	 * 
	 * starts a new round of the game
	 *
	 * @memberof Round
	 */
	start() {
        this.number = this.game.currentRound;
		this.game.deck.reset();
		this.game.deck.shuffle();
		this.drawCards();
		this.drawTrumpf();
    }

    /**
     * end
     * 
     * end the current round
     *
     * @memberof Round
     */
    end() {
        this.game.finishRound();
    }

    /**
	 * drawCards
	 * 
	 * Have each player draw their cards at the beginning
	 * of each round.
	 *
	 * @memberof Round
	 */
	drawCards() {
		this.game.players.forEach( player => {
			const cards = this.game.deck.drawCards( this.number );
			player.setCards( cards );
		} );
	}

	/**
     * drawTrumpf
     * 
     * draw the trumpf for this round
     *
     * @memberof Round
     */
    drawTrumpf() {
		this.trumpf = this.game.deck.drawCard();
	}
	
}
