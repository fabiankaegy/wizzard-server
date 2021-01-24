const { VALUES, COLORS } = require("./general");
const Card = require("./Card");
const { shuffle } = require('./helper');

/**
 * Deck
 */
class Deck {
	constructor() {
		this.cards = (() => {
			const cards = [];
			Object.values(VALUES).forEach(value => {
				for (let color in COLORS) {
					cards.push(new Card(color, value));
				}
			});
			return cards;
		})();
	}

	reset() {
		this.cards = (() => {
			const cards = [];
			for (let value in VALUES) {
				for (let color in COLORS) {
					cards.push(new Card(color, value));
				}
			}
			return cards;
		})();
	}

	get amountLeft() {
		return this.cards.length;
	}

	shuffle() {
		this.cards = shuffle( this.cards );
	}

	drawCards(amount) {
		return this.cards.splice(0, amount);
	}
}

module.exports = Deck;
