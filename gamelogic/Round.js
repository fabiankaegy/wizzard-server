class Round {
    constructor(game) {
        this.game = game;

        this.start();
    }

    /**
	 * start
	 * 
	 * starts a new round of the game
	 *
	 * @memberof Round
	 */
	start() {
        this.number = this.game.currentRound;
		this.game.deck.reset();
		this.game.deck.shuffle();
		this.drawCards();
		this.drawTrumpf();
    }

    /**
     * end
     * 
     * end the current round
     *
     * @memberof Round
     */
    end() {
        this.game.finishRound();
    }

    /**
	 * drawCards
	 * 
	 * Have each player draw their cards at the beginning
	 * of each round.
	 *
	 * @memberof Round
	 */
	drawCards() {
		this.game.players.forEach( player => {
			player.setCards( this.game.deck.drawCards( this.number ) )
		} )
	}

	/**
     * drawTrumpf
     * 
     * draw the trumpf for this round
     *
     * @memberof Round
     */
    drawTrumpf() {
		this.trumpf = this.game.deck.drawCards(1)[0];
	}
	
}

module.exports = Round;