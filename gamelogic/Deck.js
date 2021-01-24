const { VALUES, COLORS } = require("./general");
const Card = require("./Card");
const { shuffle } = require('./helper');

/**
 * Deck
 */
class Deck {

	/**
	 * Creates an instance of Deck.
	 * @memberof Deck
	 */
	constructor() {
		this.cards = Deck.create();
	}

	/**
	 * reset
	 * 
	 * resets the deck to be filled by 56 cards in the 
	 * correct order. Make sure to shuffle them before usage
	 *
	 * @memberof Deck
	 */
	reset() {
		this.cards = Deck.create();
	}


	/**
	 * remainingCards
	 * 
	 * get the number of cards left in the deck
	 * 
	 * @readonly
	 * @memberof Deck
	 */
	get remainingCards() {
		return this.cards.length;
	}


	/**
	 * shuffle
	 *
	 * Shuffle the deck
	 * 
	 * @memberof Deck
	 */
	shuffle() {
		this.cards = shuffle( this.cards );
	}


	/**
	 * drawCards
	 * 
	 * draw a certain amount of cards tom the deck
	 *
	 * @param {*} amount
	 * @return {Array} array of Cards
	 * @memberof Deck
	 */
	drawCards(amount) {
		return this.cards.splice(0, amount);
	}


	/**
	 * drawCard
	 *
	 * Draw a singular card from the deck
	 * @return {Card} singular Card
	 * @memberof Deck
	 */
	drawCard() {
		return this.drawCards(1)[0];
	}

	/**
	 * create
	 * 
	 * create a fresh deck consisting of all 56 cards in 
	 * order. This is used when the Deck gets created and 
	 * wen it gets reset.
	 *
	 * @static
	 * @returns
	 * @memberof Deck
	 */
	static create() {
		const cards = [];
		for (let value in VALUES) {
			for (let color in COLORS) {
				cards.push(new Card(color, value));
			}
		}
		return cards;
	}
}

module.exports = Deck;
