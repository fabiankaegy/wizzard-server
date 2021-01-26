"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var general_1 = require("../gamelogic/general");
var Card_1 = __importDefault(require("../gamelogic/Card"));
var compareCards_1 = __importDefault(require("../gamelogic/compareCards"));
describe("Card", function () {
    it("finds larger cards of the same color", function () {
        var redSeven = new Card_1.default(general_1.COLORS.red, general_1.VALUES.Seven);
        var redEight = new Card_1.default(general_1.COLORS.red, general_1.VALUES.Eight);
        var isLarger = compareCards_1.default(redSeven, redEight);
        expect(isLarger).toBe(true);
    });
    it("finds smaler cards of the same color", function () {
        var redSeven = new Card_1.default(general_1.COLORS.red, general_1.VALUES.Seven);
        var redEight = new Card_1.default(general_1.COLORS.red, general_1.VALUES.Eight);
        var isLarger = compareCards_1.default(redEight, redSeven);
        expect(isLarger).toBe(false);
    });
    it("wizzard wins over everything in same color", function () {
        var redWizzard = new Card_1.default(general_1.COLORS.red, general_1.VALUES.Wizzard);
        var redThirteen = new Card_1.default(general_1.COLORS.red, general_1.VALUES.Thirteen);
        var isLarger = compareCards_1.default(redThirteen, redWizzard);
        expect(isLarger).toBe(true);
    });
    it("N looses over everything in same color", function () {
        var redNarr = new Card_1.default(general_1.COLORS.red, general_1.VALUES.Narr);
        var redThirteen = new Card_1.default(general_1.COLORS.red, general_1.VALUES.Thirteen);
        var isLarger = compareCards_1.default(redThirteen, redNarr);
        expect(isLarger).toBe(false);
    });
    it("wizzard looses over other wizzard", function () {
        var redWizzard = new Card_1.default(general_1.COLORS.red, general_1.VALUES.Wizzard);
        var isLarger = compareCards_1.default(redWizzard, redWizzard);
        expect(isLarger).toBe(false);
    });
    it("wizzard winns over numer from other COLORS", function () {
        var redWizzard = new Card_1.default(general_1.COLORS.red, general_1.VALUES.Wizzard);
        var blueThirteen = new Card_1.default(general_1.COLORS.blue, general_1.VALUES.Thirteen);
        var isLarger = compareCards_1.default(blueThirteen, redWizzard);
        expect(isLarger).toBe(true);
    });
    it("trump wins over current color", function () {
        var redOne = new Card_1.default(general_1.COLORS.red, general_1.VALUES.One);
        var blueThirteen = new Card_1.default(general_1.COLORS.blue, general_1.VALUES.Thirteen);
        var isLarger = compareCards_1.default(blueThirteen, redOne, general_1.COLORS.red);
        expect(isLarger).toBe(true);
    });
    it("trump looses over wizzard", function () {
        var redOne = new Card_1.default(general_1.COLORS.red, general_1.VALUES.One);
        var blueWizzard = new Card_1.default(general_1.COLORS.blue, general_1.VALUES.Wizzard);
        var isLarger = compareCards_1.default(blueWizzard, redOne, general_1.COLORS.red);
        expect(isLarger).toBe(false);
    });
});
