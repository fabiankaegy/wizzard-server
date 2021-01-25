"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var general_1 = require("./general");
var Card_1 = __importDefault(require("./Card"));
var helper_1 = require("./helper");
/**
 * Deck
 */
var Deck = /** @class */ (function () {
    /**
     * Creates an instance of Deck.
     * @memberof Deck
     */
    function Deck() {
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
    Deck.prototype.reset = function () {
        this.cards = Deck.create();
    };
    Object.defineProperty(Deck.prototype, "remainingCards", {
        /**
         * remainingCards
         *
         * get the number of cards left in the deck
         *
         * @readonly
         * @memberof Deck
         */
        get: function () {
            return this.cards.length;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * shuffle
     *
     * Shuffle the deck
     *
     * @memberof Deck
     */
    Deck.prototype.shuffle = function () {
        this.cards = helper_1.shuffle(this.cards);
    };
    /**
     * drawCards
     *
     * draw a certain amount of cards tom the deck
     *
     * @param {*} amount
     * @return {Array} array of Cards
     * @memberof Deck
     */
    Deck.prototype.drawCards = function (amount) {
        return this.cards.splice(0, amount);
    };
    /**
     * drawCard
     *
     * Draw a singular card from the deck
     * @return {Card} singular Card
     * @memberof Deck
     */
    Deck.prototype.drawCard = function () {
        return this.drawCards(1)[0];
    };
    /**
     * create
     *
     * create a fresh deck consisting of all 56 cards in
     * order. This is used when the Deck gets created and
     * wen it gets reset.
     *
     * @static
     * @returns
     * @memberof Deck
     */
    Deck.create = function () {
        var cards = [];
        Object.values(general_1.VALUES).forEach(function (value) {
            Object.values(general_1.COLORS).forEach(function (color) {
                cards.push(new Card_1.default(color, value));
            });
        });
        return cards;
    };
    return Deck;
}());
exports.default = Deck;
