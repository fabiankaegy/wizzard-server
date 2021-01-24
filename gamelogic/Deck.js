const { VALUES, COLORS } = require("./general");
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
		const array = this.cards;
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		this.cards = array;
	}

	drawCards(amount) {
		return this.cards.splice(0, amount);
	}
}

module.exports = Deck;
