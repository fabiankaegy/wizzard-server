import { CardValue } from "./general";

/**
 * Card
 */
export default class Card {
	color: string;
	value: CardValue;

	/**
	 * Creates an instance of Card.
	 * @param {*} color
	 * @param {*} number
	 * @memberof Card
	 */
	constructor(color: string, number: CardValue) {
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
