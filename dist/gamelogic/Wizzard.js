"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Deck_1 = __importDefault(require("./Deck"));
var Round_1 = __importDefault(require("./Round"));
var helper_1 = require("./helper");
var Types_1 = require("./Types");
/**
 * Wizzard
 *
 * This is the main game implementation of the game Wizzard
 */
var Wizzard = /** @class */ (function () {
    function Wizzard(Players, socket) {
        this.players = Players;
        this.deck = new Deck_1.default();
        this.rounds = this.deck.cards.length / this.players.length;
        this.player = this.players.length;
        this.currentRound = 1;
        this.state = Types_1.GameState.Created;
        this.socket = socket;
        this.startGame();
    }
    /**
     * startGame
     *
     * initialize a new game and start the first round
     *
     * @memberof Wizzard
     */
    Wizzard.prototype.startGame = function () {
        this.setRandomPlayerOrder();
        this.round = new Round_1.default(this);
        this.state = Types_1.GameState.Started;
    };
    /**
     * finishRound
     *
     * Finish the current round and figure out wether to
     * start a new one or finish the game
     *
     * @memberof Wizzard
     */
    Wizzard.prototype.finishRound = function () {
        if (this.currentRound === this.rounds) {
            this.state = Types_1.GameState.Completed;
            // end the game here.
        }
        else {
            this.movePlayerIndex();
            this.currentRound++;
            this.round = new Round_1.default(this);
            this.round.start();
        }
    };
    /**
     * movePlayerIndex
     *
     * move the first player in the player array to the
     * end and therefore bring everone else one step closer
     * to the start. The order of the array determines the
     * order in which the game gets played.
     *
     * @memberof Wizzard
     */
    Wizzard.prototype.movePlayerIndex = function () {
        var first = this.players.shift();
        this.players.push(first);
    };
    /**
     * setRandomPlayerOrder
     *
     * shuffle arround the array of players to randomly
     * choose the order in which the rounds will be played.
     * In a normal game this will only be called once as
     * part of the initial setup.
     *
     * @memberof Wizzard
     */
    Wizzard.prototype.setRandomPlayerOrder = function () {
        this.players = helper_1.shuffle(this.players);
    };
    /**
     * findPlayer
     *
     * find a player via the id
     *
     * @param {string} id
     * @returns
     * @memberof Wizzard
     */
    Wizzard.prototype.findPlayer = function (id) {
        return this.players.find(function (player) { return player.id === id; });
    };
    Object.defineProperty(Wizzard.prototype, "currentTrump", {
        get: function () {
            var _a;
            return (_a = this.round) === null || _a === void 0 ? void 0 : _a.trumpf;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * shareGameState
     *
     * share the current state of the game with all connected players
     *
     * @memberof Wizzard
     */
    Wizzard.prototype.shareGameState = function () {
        var _a;
        var gameState = {
            players: this.players.map(function (player) { return player.publicInfo; }),
            gameState: this.state,
            currentRound: this.currentRound,
            trumpf: this.currentTrump,
        };
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(Types_1.SocketInteractions.shareGameState, gameState);
        console.log("Game State:", gameState);
        this.players.forEach(function (player) { var _a; return (_a = player.socket) === null || _a === void 0 ? void 0 : _a.emit(Types_1.SocketInteractions.sharePlayerState, player.privateInfo); });
    };
    return Wizzard;
}());
exports.default = Wizzard;
