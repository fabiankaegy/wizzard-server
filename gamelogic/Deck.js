const { VALUES, COCOLORS } = require("./general");
const Card = require("./Card");

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
		var j, x, i;
		for (i = this.cards.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = this.cards[i];
			this.cards[i] = this.cards[j];
			this.cards[j] = x;
		}
		return this.cards;
	}

	drawCards(amount) {
		return this.cards.splice(0, amount);
	}
}

module.exports = Deck;
