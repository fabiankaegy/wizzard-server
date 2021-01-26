import Card from "./Card";
import Deck from "./Deck";
import Player from "./Player";

/**
 * Round
 * 
 * A representation of initial game rounds
 *
 * @class Round
 */
export default class Round {

	deck: Deck;
	players: Player[];
	number: number = 0;
	trumpf?: Card;
	shareUpdates: Function;
	endRound: Function;

	/**
	 * Creates an instance of Round.
	 * @param {Player[]} players
	 * @param {number} currentRound
	 * @param {Function} shareUpdates
	 * @param {Function} endround
	 * @memberof Round
	 */
	constructor( players: Player[], currentRound: number, shareUpdates: Function, endRound: Function) {
        this.deck = new Deck();
        this.players = players;
		this.trumpf = undefined;
		this.number = currentRound;
		this.shareUpdates = shareUpdates;
		this.endRound = endRound;
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
		this.deck.reset();
		this.deck.shuffle();
		this.drawCards();
		this.drawTrumpf();
		this.shareUpdates();
    }

    /**
     * end
     * 
     * end the current round
     *
     * @memberof Round
     */
    end() {
        this.endRound();
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
		this.players.forEach( player => {
			const cards = this.deck.drawCards( this.number );
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
		const card = this.deck.drawCard();
		this.trumpf = card;
	}
}
