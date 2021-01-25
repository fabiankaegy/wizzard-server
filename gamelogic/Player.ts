import { Socket } from 'socket.io';
import Card from './Card';

/**
 * Player
 */
export default class Player {
	name: string;
	score: number;
	id: string;
	socket?: Socket;
	prediction?: number;
	cards?: Card[];

	/**
	 * Creates an instance of Player.
	 * @param {String} name
	 * @param {String} id
	 * @param {String} socket
	 * @memberof Player
	 */
	constructor(name: string, id?: string, socket?: Socket) {
		this.name = name;
		this.score = 0;
		this.id = id || 'none';
		this.socket = socket;
	}

	/**
	 * setPrediction
	 *
	 * @param {Number} stashes
	 * @memberof Player
	 */
	setPrediction(stashes:number) {
		this.prediction = stashes;
	}

	/**
	 * setActual
	 *
	 * @param {Number} stashes
	 * @memberof Player
	 */
	setActual(numberOfWins: number) {

		if ( this.prediction === undefined ) {
			throw new Error( `The player hasn't made any predictions jet` );
		}

		if (this.prediction === numberOfWins) {
			this.updateScore(numberOfWins * 10 + 20);
		} else {
			const offBy = Math.abs(this.prediction - numberOfWins);
			this.updateScore(numberOfWins * 10 + offBy * -10);
		}
	}

	/**
	 * updateScore
	 *
	 * @param {Number} by value by which to increase the score
	 * @memberof Player
	 */
	updateScore(by: number) {
		this.prediction = undefined;
		this.score += by;
	}

	/**
	 * playCard
	 *
	 * @param {Number} index index of the card the player wants to play
	 * @return {Card} the card the player chose
	 * @memberof Player
	 */
	playCard(index: number) {
		if ( ! this.cards?.length ) {
			throw new Error( `This Player doesn't have any card's Jet` );
		}

		const card = this.cards[index];
		this.cards.splice(index, 1);
		console.log(`${this.name} played ${card.name}`);
		return card;
	}

	/**
	 * setCards
	 *
	 * @param {Array.<Card>} cards
	 * @memberof Player
	 */
	setCards(cards: Card[]) {
		this.cards = cards;
	}

	/**
	 * findCardIndex
	 *
	 * @param {Card} cardSearched
	 * @return {Number} Index of the card in the players cards
	 * @memberof Player
	 */
	findCardIndex(cardSearched: Card) {
		if ( ! this.cards?.length ) {
			throw new Error( `This Player doesn't have any card's Jet` );
		}

		const card = this.cards.find(
			card => card.value === cardSearched.value && card.color === cardSearched.color
		);

		if ( !card ) {
			throw new Error( `The player doesn't have this card` );
		}

		return this.cards.indexOf(card);
	}
}
