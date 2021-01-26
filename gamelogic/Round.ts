import Card from "./Card";
import Deck from "./Deck";
import Player from "./Player";

export type RoundOptions = {
	players: Player[],
	currentRound: number,
	shareUpdates: Function,
	endRound: Function
};

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
	constructor(options: RoundOptions) {
        this.deck = new Deck();
        this.players = options.players;
		this.trumpf = undefined;
		this.number = options.currentRound;
		this.shareUpdates = options.shareUpdates;
		this.endRound = options.endRound;
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
		this.shareUpdates({trumpf: this.trumpf});
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
