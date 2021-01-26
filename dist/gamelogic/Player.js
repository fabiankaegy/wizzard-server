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
        this.wins = 0;
    }
    /**
     * setPrediction
     *
     * @param {Number} stashes
     * @memberof Player
     */
    Player.prototype.setPrediction = function (stashes) {
        if (this.prediction !== undefined) {
            throw new Error("The Player " + this.name + " already made their prediction.");
        }
        this.resetWins();
        this.prediction = stashes;
    };
    /**
     * calculateScore
     *
     * @param {Number} stashes
     * @memberof Player
     */
    Player.prototype.calculateScore = function () {
        if (this.prediction === undefined) {
            throw new Error("The Player " + this.name + " hasn't made any predictions jet");
        }
        if (this.prediction === this.wins) {
            this.updateScore(this.wins * 10 + 20);
        }
        else {
            var offBy = Math.abs(this.prediction - this.wins);
            this.updateScore(this.wins * 10 + offBy * -10);
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
    /**
     * increaseWins
     *
     * @param {number} [by=1]
     * @memberof Player
     */
    Player.prototype.increaseWins = function (by) {
        if (by === void 0) { by = 1; }
        this.wins = this.wins + by;
    };
    /**
     * resetWins
     *
     * @memberof Player
     */
    Player.prototype.resetWins = function () {
        this.wins = 0;
    };
    Object.defineProperty(Player.prototype, "privateInfo", {
        get: function () {
            return {
                id: this.id,
                name: this.name,
                cards: this.cards,
                wins: this.wins,
                prediction: this.prediction,
                score: this.score
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "publicInfo", {
        get: function () {
            return {
                id: this.id,
                name: this.name,
                wins: this.wins,
                prediction: this.prediction,
                score: this.score
            };
        },
        enumerable: false,
        configurable: true
    });
    return Player;
}());
exports.default = Player;
