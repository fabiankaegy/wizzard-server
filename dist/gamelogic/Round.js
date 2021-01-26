"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Round
 *
 * A representation of initial game rounds
 *
 * @class Round
 */
var Round = /** @class */ (function () {
    /**
     * Creates an instance of Round.
     * @param {Wizzard} game game instance
     * @memberof Round
     */
    function Round(game) {
        this.number = 0;
        this.game = game;
        this.start();
    }
    /**
     * start
     *
     * starts a new round of the game
     *
     * @memberof Round
     */
    Round.prototype.start = function () {
        this.number = this.game.currentRound;
        this.game.deck.reset();
        this.game.deck.shuffle();
        this.drawCards();
        this.drawTrumpf();
        this.game.shareGameState();
    };
    /**
     * end
     *
     * end the current round
     *
     * @memberof Round
     */
    Round.prototype.end = function () {
        this.game.finishRound();
    };
    /**
     * drawCards
     *
     * Have each player draw their cards at the beginning
     * of each round.
     *
     * @memberof Round
     */
    Round.prototype.drawCards = function () {
        var _this = this;
        this.game.players.forEach(function (player) {
            var cards = _this.game.deck.drawCards(_this.number);
            player.setCards(cards);
        });
    };
    /**
     * drawTrumpf
     *
     * draw the trumpf for this round
     *
     * @memberof Round
     */
    Round.prototype.drawTrumpf = function () {
        var card = this.game.deck.drawCard();
        console.log(card);
        this.trumpf = card;
    };
    return Round;
}());
exports.default = Round;
