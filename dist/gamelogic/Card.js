"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Card
 */
var Card = /** @class */ (function () {
    /**
     * Creates an instance of Card.
     * @param {*} color
     * @param {*} number
     * @memberof Card
     */
    function Card(color, number) {
        this.color = color;
        this.value = number;
    }
    Object.defineProperty(Card.prototype, "name", {
        /**
         * get name
         *
         * @readonly
         * @memberof Card
         */
        get: function () {
            return this.color + " " + this.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "sign", {
        /**
         * get sign
         *
         * @readonly
         * @memberof Card
         */
        get: function () {
            return this.value.sign;
        },
        enumerable: false,
        configurable: true
    });
    return Card;
}());
exports.default = Card;
