"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Wizzard_1 = __importDefault(require("../gamelogic/Wizzard"));
var Player_1 = __importDefault(require("../gamelogic/Player"));
describe("Deck", function () {
    var myGame;
    beforeEach(function () {
        myGame = new Wizzard_1.default([new Player_1.default("Fabian"), new Player_1.default("Moritz"), new Player_1.default("Bea"), new Player_1.default("Michel")]);
    });
    it("Player count works", function () {
        expect(myGame.player).toBe(4);
    });
    it("has method to reorder players", function () {
        var firstBefore = myGame.players[0];
        var seccondBefore = myGame.players[1];
        myGame.movePlayerIndex();
        var lastAfter = myGame.players[myGame.player - 1];
        var firstAfter = myGame.players[0];
        expect(firstBefore).toBe(lastAfter);
        expect(seccondBefore).toBe(firstAfter);
    });
});
