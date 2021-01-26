"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = __importDefault(require("../gamelogic/Player"));
describe("Player", function () {
    var Fabian;
    beforeEach(function () {
        Fabian = new Player_1.default("Fabian");
    });
    it("calculates correct score for correct predicted stashes", function () {
        Fabian.setPrediction(2);
        Fabian.increaseWins(2);
        Fabian.calculateScore();
        expect(Fabian.score).toBe(40);
    });
    it("calculates correct score for too low predicted stashes", function () {
        Fabian.setPrediction(2);
        expect(Fabian.score).toBe(0);
    });
    it("calculates correct score for too highly predicted stashes", function () {
        Fabian.setPrediction(5);
        Fabian.increaseWins(6);
        Fabian.calculateScore();
        expect(Fabian.score).toBe(50);
    });
});
