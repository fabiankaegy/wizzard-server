/**
 * Card
 */
class Card {

	/**
	 * Creates an instance of Card.
	 * @param {*} color
	 * @param {*} number
	 * @memberof Card
	 */
	constructor(color, number) {
		this.color = color;
		this.value = number;
	}

	/**
	 * get name
	 *
	 * @readonly
	 * @memberof Card
	 */
	get name() {
		return `${this.color} ${this.value}`;
	}

	/**
	 * get sign
	 *
	 * @readonly
	 * @memberof Card
	 */
	get sign() {
		return this.value.sign;
	}
}

module.exports = Card;
