import Deck from "./Deck";
import Round from "./Round";
import { shuffle } from './helper';
import Player from "./Player";
import { Server } from "socket.io";
import { SocketInteractions, GameState } from './Types';
import Card from "./Card";
import log from "../helper";

/**
 * Wizzard
 * 
 * This is the main game implementation of the game Wizzard
 *
 * @export
 * @class Wizzard
 */
export default class Wizzard {
	players: Player[];
	rounds: number;
	player: number;
	currentRound: number;
	round?: Round;
	state: GameState;
	server?: Server;

	/**
	 * Creates an instance of Wizzard.
	 * @param {Player[]} Players
	 * @param {Server} [server]
	 * @memberof Wizzard
	 */
	constructor(Players: Player[], server?: Server) {
		this.players = Players;
		this.rounds = Deck.length / this.players.length;
		this.player = this.players.length;
		this.currentRound = 1;
		this.state = GameState.Created;
		this.server = server;

		this.startGame = this.startGame.bind(this);
		this.handleRoundCompletion = this.handleRoundCompletion.bind(this);
		this.movePlayerIndex = this.movePlayerIndex.bind(this);
		this.findPlayer = this.findPlayer.bind(this);
		this.shareGameState = this.shareGameState.bind(this);

		this.startGame();
	}

	/**
	 * startGame
	 * 
	 * initialize a new game and start the first round
	 *
	 * @memberof Wizzard
	 */
	startGame() {
		this.setRandomPlayerOrder();
		this.round = this.createRound();
		this.state = GameState.Started
	}

	/**
	 * createRound
	 *
	 * @returns {Round}
	 * @memberof Wizzard
	 */
	createRound():Round {
		return new Round({
			players: this.players,
			currentRound: this.currentRound,
			shareUpdates: this.shareGameState,
			endRound: this.handleRoundCompletion
		});
	}

	/**
	 * handleRoundCompletion
	 * 
	 * Finish the current round and figure out wether to 
	 * start a new one or finish the game
	 *
	 * @memberof Wizzard
	 */
	handleRoundCompletion() {
		if ( this.currentRound === this.rounds ) {
			this.state = GameState.Completed;
			// end the game here.
		} else {
			this.movePlayerIndex();
			this.currentRound++;
			this.round = this.createRound();
		}
	}

	/**
	 * movePlayerIndex
	 * 
	 * move the first player in the player array to the 
	 * end and therefore bring everone else one step closer
	 * to the start. The order of the array determines the 
	 * order in which the game gets played.
	 *
	 * @memberof Wizzard
	 */
	movePlayerIndex() {
		const first = this.players.shift()!;

		this.players.push(first);
	}

	/**
	 * setRandomPlayerOrder
	 * 
	 * shuffle arround the array of players to randomly 
	 * choose the order in which the rounds will be played.
	 * In a normal game this will only be called once as 
	 * part of the initial setup.
	 *
	 * @private
	 * @memberof Wizzard
	 */
	private setRandomPlayerOrder() {
		this.players = shuffle( this.players );
	}

	/**
	 * findPlayer
	 * 
	 * find a player via their id
	 *
	 * @param {string} id
	 * @returns {Player}
	 * @memberof Wizzard
	 */
	findPlayer( id: string ): Player {
		return this.players.find( (player: Player) => player.id === id )!;
	}

	/**
	 * shareGameState
	 * 
	 * share the current state of the game with all connected players
	 *
	 * @memberof Wizzard
	 */
	shareGameState(options?:{ trumpf?: Card }) {

		const gameState = {
			players: this.players.map( player => player.publicInfo ),
			gameState: this.state,
			currentRound: this.currentRound,
			trumpf: options?.trumpf,
		}

		this.server?.emit( SocketInteractions.shareGameState, gameState );
		log.code( "Game State:" );
		log.info( gameState );
		log.info( '' );

		this.players.forEach(
			player => player.sharePlayerPrivateInfo()
		);
	}
	
}
