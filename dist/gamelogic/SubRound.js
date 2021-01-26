"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var compareCards_1 = __importDefault(require("./compareCards"));
var Types_1 = require("./Types");
/**
 * SubRound
 *
 * Used to keep track of each subround
 *
 * @export
 * @class SubRound
 */
var SubRound = /** @class */ (function () {
    function SubRound(game) {
        this.game = game;
        this.round = game.currentRound;
        this.players = game.players;
        this.playedCards = [];
    }
    /**
     * start
     *
     * @memberof SubRound
     */
    SubRound.prototype.start = function () {
        this.subscribeToPlayerInteractions();
        this.setCurrentPlayer();
    };
    /**
     * end
     *
     * @memberof SubRound
     */
    SubRound.prototype.end = function () {
        this.bestCard.player.increaseWins();
        this.game.shareGameState();
    };
    /**
     * setCurrentPlayer
     *
     * @memberof SubRound
     */
    SubRound.prototype.setCurrentPlayer = function () {
        // end the game if no more players are in the subround
        if (!this.players.length) {
            this.end();
            return;
        }
        // loop over the players and get the first one that doesn't have a prediction jet
        var player = this.players.find(function (player) { return player.prediction === undefined; });
        if (player) {
            // if there is a user without predictions set that player as the current player
            this.currentPlayer = player;
        }
        else {
            // if there are no players without predictions get the first player from the array 
            player = this.players.shift();
        }
        // set the current player
        this.currentPlayer = player;
    };
    /**
     * handlePlayerGavePrediction
     *
     * @param {Player} player
     * @memberof SubRound
     */
    SubRound.prototype.handlePlayerGavePrediction = function (player) {
    };
    /**
     * handlePlayerPlayedCard
     *
     * @param {Card} card
     * @param {Player} player
     * @memberof SubRound
     */
    SubRound.prototype.handlePlayerPlayedCard = function (card, player) {
        var _a, _b, _c;
        var isNewBestCard = compareCards_1.default((_b = (_a = this.bestCard) === null || _a === void 0 ? void 0 : _a.card) !== null && _b !== void 0 ? _b : this.playedCards[this.playedCards.length - 1].card, card, ((_c = this.game.round) === null || _c === void 0 ? void 0 : _c.trumpf) ? this.game.round.trumpf.color : false);
        if (isNewBestCard) {
            this.bestCard = { player: player, card: card };
        }
        this.playedCards.push({ player: player, card: card });
    };
    /**
     * attach listener to the socket of each player.
     * The goal is to subscribe to the player_interaction updates that are
     * send from each individual player.
     *
     * @memberof SubRound
     */
    SubRound.prototype.subscribeToPlayerInteractions = function () {
        var _this = this;
        this.players.map(function (player) {
            var _a;
            (_a = player.socket) === null || _a === void 0 ? void 0 : _a.on(Types_1.SocketInteractions.recivePlayerInteraction, function (_a) {
                var id = _a.id, type = _a.type, value = _a.value;
                if (!(id === player.id)) {
                    throw new Error('This message was not intended for this Player');
                }
                if (type === Types_1.PlayerInteractions.recivePrediction) {
                    player.setPrediction(value);
                    _this.handlePlayerGavePrediction(player);
                }
                if (type === Types_1.PlayerInteractions.reciveMove) {
                    var card = player.playCard(value);
                    _this.handlePlayerPlayedCard(card, player);
                }
            });
        });
    };
    return SubRound;
}());
exports.default = SubRound;
