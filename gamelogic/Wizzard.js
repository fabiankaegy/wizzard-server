const Deck = require("./Deck");
const Round = require("./Round");
const { shuffle } = require('./helper');

/**
 * Wizzard
 * 
 * This is the main game implementation of the game Wizzard
 */
class Wizzard {
	constructor(Players) {
		this.players = Players;
		this.deck = new Deck();
		this.rounds = this.deck.cards.length / this.players.length;
		this.player = this.players.length;
		this.currentRound = 1;

		this.startGame();
	}

	/**
	 * startGame
	 * 
	 * initialize a new game and start the first round
	 *
	 * @memberof Wizzard
	 */
	startGame() {
		this.setRandomPlayerOrder();
		this.round = new Round( this );
	}

	/**
	 * finishRound
	 * 
	 * Finish the current round and figure out wether to 
	 * start a new one or finish the game
	 *
	 * @memberof Wizzard
	 */
	finishRound() {
		if ( this.currentRound === this.rounds ) {
			// end the game here.
		} else {
			this.movePlayerIndex();
			this.currentRound++;
			this.round.start();
		}
	}

	/**
	 * movePlayerIndex
	 * 
	 * move the first player in the player array to the 
	 * end and therefore bring everone else one step closer
	 * to the start. The order of the array determines the 
	 * order in which the game gets played.
	 *
	 * @memberof Wizzard
	 */
	movePlayerIndex() {
		const first = this.players.shift();
		this.players.push(first);
	}

	/**
	 * setRandomPlayerOrder
	 * 
	 * shuffle arround the array of players to randomly 
	 * choose the order in which the rounds will be played.
	 * In a normal game this will only be called once as 
	 * part of the initial setup. 
	 *
	 * @memberof Wizzard
	 */
	setRandomPlayerOrder() {
		this.players = shuffle( this.players );
	}
	
}

module.exports = Wizzard;