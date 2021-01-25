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
        Fabian.setActual(2);
        expect(Fabian.score).toBe(40);
    });
    it("calculates correct score for too low predicted stashes", function () {
        Fabian.setPrediction(2);
        Fabian.setActual(0);
        expect(Fabian.score).toBe(-20);
    });
    it("calculates correct score for too highly predicted stashes", function () {
        Fabian.setPrediction(5);
        Fabian.setActual(10);
        expect(Fabian.score).toBe(50);
    });
});
