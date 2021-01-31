import log from "../helper";
import Card from "./Card";
import Deck from "./Deck";
import Player from "./Player";
import SubRound from "./SubRound";

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
	subRound?: SubRound;

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

		this.start = this.start.bind( this );
		this.end = this.end.bind( this );
		this.drawCards = this.drawCards.bind( this );
		this.drawTrumpf = this.drawTrumpf.bind( this );
		this.createSubRound = this.createSubRound.bind( this );
		this.handleUpdates = this.handleUpdates.bind( this );
		this.handleSubRoundEnd = this.handleSubRoundEnd.bind( this );

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
		this.createSubRound();
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
	 * handleSubRoundEnd
	 *
	 * @param {Player} winner
	 * @memberof Round
	 */
	handleSubRoundEnd( winner: Player ) {
		log.info( `The SubRound was won by ${winner.name}!` )
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

	/**
	 * createSubRound
	 *
	 * @memberof Round
	 */
	createSubRound() {
		this.subRound = new SubRound( {
			players: this.players,
			currentRound: this.number,
			trumpf: this.trumpf,
			shareUpdates: this.handleUpdates,
			endSubRound: this.handleSubRoundEnd
		} );
	}

	/**
	 * handleUpdates
	 *
	 * @memberof Round
	 */
	handleUpdates() {
		this.shareUpdates( { trumpf: this.trumpf } )
	}
}
