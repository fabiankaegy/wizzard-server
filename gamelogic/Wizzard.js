const Player = require("./Player");
const Deck = require("./Deck");
const compareCards = require("./compareCards");

/**
 * Wizzard
 */
class Wizzard {
	constructor(Players) {
		this.players = Players;
		this.deck = new Deck();
		this.rounds = this.deck.cards.length / this.players.length;
		this.currentRound = 1;
		this.currentSubRound = 1;
		this.currentTrump = undefined;
	}

	movePlayerIndex() {
		const first = this.players.shift();
		this.players.push(first);
	}

	startRound() {
		this.subrounds = this.currentRound;
		this.deck = new Deck();
		this.deck.reset();
		this.deck.shuffle();
		this.players.forEach(player => {
			player.drawCards(this.deck.drawCards(this.currentRound));
		});
		this.currentTrump = this.deck.drawCards(1)[0];
	}

	endRound() {
		this.movePlayerIndex();
		this.currentRound++;
	}

	startSubRound() {}

	playCard(currentCard, player) {
		if (
			!this.lastBestCard.card ||
			!compareCards(this.lastBestCard.card, currentCard)
		) {
			this.lastBestCard = { card: currentCard, player };
		}

		if (this.subrounds === this.currentSubRound) {
			player.subroundsWon++;
		}
	}

	get score() {
		return this.players.sort((a, b) => a.score < b.score);
	}

	get player() {
		return this.players.length;
	}

	get currentPlayer() {
		return this.players[0];
	}

	findPlayer(id) {
		return this.players.filter(player => player.id === id)[0];
	}
}

module.exports = Wizzard;
