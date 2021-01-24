/**
 * Player
 */
class Player {
	/**
	 * Creates an instance of Player.
	 * @param {String} name
	 * @param {String} id
	 * @param {String} socket
	 * @memberof Player
	 */
	constructor(name, id, socket) {
		this.name = name;
		this.score = 0;
		this.id = id;
		this.socket = socket;
	}

	/**
	 * setPrediction
	 *
	 * @param {Number} stashes
	 * @memberof Player
	 */
	setPrediction(stashes) {
		this.prediction = stashes;
	}

	/**
	 * setActual
	 *
	 * @param {Number} stashes
	 * @memberof Player
	 */
	setActual(numberOfWins) {
		if (this.prediction === numberOfWins) {
			this.updateScore(numberOfWins * 10 + 20);
		} else {
			const offBy = Math.abs(this.prediction - numberOfWins);
			this.updateScore(numberOfWins * 10 + offBy * -10);
		}
	}

	/**
	 * updateScore
	 *
	 * @param {Number} by value by which to increase the score
	 * @memberof Player
	 */
	updateScore(by) {
		this.prediction = undefined;
		this.score += by;
	}

	/**
	 * playCard
	 *
	 * @param {Number} index index of the card the player wants to play
	 * @return {Card} the card the player chose
	 * @memberof Player
	 */
	playCard(index) {
		const card = this.cards[index];
		this.cards.splice(index, 1);
		console.log(`${this.name} played ${card.name}`);
		return card;
	}

	/**
	 * setCards
	 *
	 * @param {Array.<Card>} cards
	 * @memberof Player
	 */
	setCards(cards) {
		this.cards = cards;
	}

	/**
	 * findCardIndex
	 *
	 * @param {Card} cardSearched
	 * @return {Number} Index of the card in the players cards
	 * @memberof Player
	 */
	findCardIndex(cardSearched) {
		const card = this.cards.find(
			card =>
				card.value === cardSearched.value && card.color === cardSearched.color
		);

		return this.cards.indexOf(card);
	}
}

module.exports = Player;
