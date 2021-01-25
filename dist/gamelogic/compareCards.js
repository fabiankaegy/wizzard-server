"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var general_1 = require("./general");
/**
 * compareCards
 *
 * @param {Card} previous card to beat in the comparrison
 * @param {Card} current card that will be compared to the currently best card
 * @param {boolean} [trumpColor=true] color of the current trumpf
 * @returns
 */
function compareCards(previous, current, trumpColor) {
    if (trumpColor === void 0) { trumpColor = false; }
    var isWizzard = current.value.number === general_1.VALUES.Wizzard.number;
    var isPreviousWizzard = previous.value.number === general_1.VALUES.Wizzard.number;
    var isTrumpColor = current.color === trumpColor;
    var isSameColor = current.color === previous.color;
    var isLargerValue = current.value.number > previous.value.number;
    if (!isPreviousWizzard && isWizzard) {
        return true;
    }
    if (!isPreviousWizzard && ((isSameColor && isLargerValue) || isTrumpColor)) {
        return true;
    }
    return false;
}
exports.default = compareCards;
;
