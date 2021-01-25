"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Player
 */
var Player = /** @class */ (function () {
    /**
     * Creates an instance of Player.
     * @param {String} name
     * @param {String} id
     * @param {String} socket
     * @memberof Player
     */
    function Player(name, id, socket) {
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
    Player.prototype.setPrediction = function (stashes) {
        this.prediction = stashes;
    };
    /**
     * setActual
     *
     * @param {Number} stashes
     * @memberof Player
     */
    Player.prototype.setActual = function (numberOfWins) {
        if (this.prediction === undefined) {
            throw new Error("The player hasn't made any predictions jet");
        }
        if (this.prediction === numberOfWins) {
            this.updateScore(numberOfWins * 10 + 20);
        }
        else {
            var offBy = Math.abs(this.prediction - numberOfWins);
            this.updateScore(numberOfWins * 10 + offBy * -10);
        }
    };
    /**
     * updateScore
     *
     * @param {Number} by value by which to increase the score
     * @memberof Player
     */
    Player.prototype.updateScore = function (by) {
        this.prediction = undefined;
        this.score += by;
    };
    /**
     * playCard
     *
     * @param {Number} index index of the card the player wants to play
     * @return {Card} the card the player chose
     * @memberof Player
     */
    Player.prototype.playCard = function (index) {
        var _a;
        if (!((_a = this.cards) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new Error("This Player doesn't have any card's Jet");
        }
        var card = this.cards[index];
        this.cards.splice(index, 1);
        console.log(this.name + " played " + card.name);
        return card;
    };
    /**
     * setCards
     *
     * @param {Array.<Card>} cards
     * @memberof Player
     */
    Player.prototype.setCards = function (cards) {
        this.cards = cards;
    };
    /**
     * findCardIndex
     *
     * @param {Card} cardSearched
     * @return {Number} Index of the card in the players cards
     * @memberof Player
     */
    Player.prototype.findCardIndex = function (cardSearched) {
        var _a;
        if (!((_a = this.cards) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new Error("This Player doesn't have any card's Jet");
        }
        var card = this.cards.find(function (card) { return card.value === cardSearched.value && card.color === cardSearched.color; });
        if (!card) {
            throw new Error("The player doesn't have this card");
        }
        return this.cards.indexOf(card);
    };
    return Player;
}());
exports.default = Player;
