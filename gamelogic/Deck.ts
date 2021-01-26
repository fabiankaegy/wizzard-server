import { VALUES, COLORS } from "./general";
import Card from "./Card";
import { shuffle } from './helper';

/**
 * Deck
 *
 * @export
 * @class Deck
 */
export default class Deck {
	cards: Card[];

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
	 * @type {number}
	 * @memberof Deck
	 */
	get remainingCards(): number {
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
	 * @returns {Card[]}
	 * @memberof Deck
	 */
	drawCards(amount: number): Card[] {
		return this.cards.splice(0, amount);
	}


	/**
	 * drawCard
	 *
	 * Draw a singular card from the deck
	 * @returns {Card} singular Card
	 * @memberof Deck
	 */
	drawCard(): Card {
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
	 * @returns {Card[]}
	 * @memberof Deck
	 */
	static create(): Card[] {
		const cards: Card[] = [];

		Object.values( VALUES ).forEach( value => {
			Object.values( COLORS ).forEach( color => {
				cards.push(new Card(color, value));
			})
		});

		return cards;
	}
}
