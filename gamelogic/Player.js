/**
 * Player
 */
class Player {
	constructor(name, id, socket) {
		this.name = name;
		this.score = 0;
		this.id = id;
		this.socket = socket;
	}

	predict(stashes) {
		this.prediction = stashes;
	}

	actual(stashes) {
		if (this.prediction === stashes) {
			this.updateScore(stashes * 10 + 20);
		}

		if (this.prediction > stashes) {
			const underBy = this.prediction - stashes;
			const result = stashes * 10 + underBy * -10;
			this.updateScore(result);
		}

		if (stashes > this.prediction) {
			const overBy = stashes - this.prediction;
			const result = stashes * 10 + overBy * -10;
			this.updateScore(result);
		}
	}

	updateScore(by) {
		this.prediction = undefined;
		this.score += by;
	}

	playCard(index) {
		const card = this.cards[index];
		this.cards.splice(index, 1);
		console.log(`${this.name} played ${card.name}`);
		return card;
	}

	setCards(cards) {
		this.cards = cards;
	}

	findCardIndex(cardSearched) {
		const card = this.cards.filter(
			card =>
				card.value === cardSearched.value && card.color === cardSearched.color
		)[0];

		const index = this.cards.indexOf(card);

		return index;
	}
}

module.exports = Player;
