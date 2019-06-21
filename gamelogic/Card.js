/**
 * Card
 * color {colors}
 * number { 1-13 | N | Z }
 */
class Card {
	constructor(color, number) {
		this.color = color;
		this.value = number;
	}

	get name() {
		return `${this.color} ${this.value}`;
	}

	get sign() {
		return this.value.sign;
	}
}

module.exports = Card;
