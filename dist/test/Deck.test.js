"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Deck_1 = __importDefault(require("../gamelogic/Deck"));
describe("Deck", function () {
    var myDeck;
    beforeEach(function () {
        myDeck = new Deck_1.default();
    });
    it("has a working shuffle method", function () {
        var preShuffle = __spreadArrays(myDeck.cards);
        myDeck.shuffle();
        var firstCard = myDeck.cards[0].name !== preShuffle[0].name;
        var seccondCard = myDeck.cards[1].name !== preShuffle[1].name;
        var eleventhCard = myDeck.cards[10].name !== preShuffle[10].name;
        var sixtiethCard = myDeck.cards[59].name !== preShuffle[59].name;
        var conditioin = firstCard || seccondCard || eleventhCard || sixtiethCard;
        expect(conditioin).toBe(true);
    });
    it("can draw cards", function () {
        var initialAmount = myDeck.remainingCards;
        var amount = 5;
        myDeck.drawCards(amount);
        expect(initialAmount - amount).toBe(myDeck.remainingCards);
    });
});
