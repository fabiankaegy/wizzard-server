const Player = require("./Player");
const Deck = require("./Deck");
const compareCards = require("./compareCards");
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
		this.currentSubRound = 1;
		this.currentTrump = null;

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
		this.startRound();
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
	 * startRound
	 * 
	 * starts a new round of the game
	 *
	 * @memberof Wizzard
	 */
	startRound() {
		this.deck.reset();
		this.deck.shuffle();
		this.drawCards();
		this.drawTrumpf();
	}

	/**
	 * endRound
	 * 
	 * end the currentRound and either end the game or start
	 * a new round.
	 *
	 * @memberof Wizzard
	 */
	endRound() {
		if ( this.currentRound === this.rounds ) {
			// the game is finished now. Show the Winner. 
		} else {
			this.movePlayerIndex();
			this.currentRound++;
			this.startRound();
		}
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


	/**
	 * drawCards
	 * 
	 * Have each player draw their cards at the beginning
	 * of each round.
	 *
	 * @memberof Wizzard
	 */
	drawCards() {
		this.players.forEach( player => {
			player.setCards( this.deck.drawCards( this.currentRound ) )
		} )
	}

	drawTrumpf() {
		this.currentTrump = this.deck.drawCards(1)[0];
	}
	
}

module.exports = Wizzard;


const myGame = new Wizzard( [ new Player('Fabian'), new Player('Bea'), new Player('Tim'), new Player('moritz') ] );

myGame.currentRound = 15;
myGame.player //?
myGame.startRound();
myGame.players[0].cards //?

myGame.currentTrump //?