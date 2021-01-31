import { CardValue } from "./general";

/**
 * Card
 *
 * @export
 * @class Card
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
	constructor(color: string, value: CardValue) {
		this.color = color;
		this.value = value;
	}

	/**
	 * name
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Card
	 */
	get name(): string {
		return `${this.color} ${this.value.sign}`;
	}

	/**
	 * sign
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Card
	 */
	get sign(): string {
		return this.value.sign;
	}
}
