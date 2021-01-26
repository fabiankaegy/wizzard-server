import Player from "./Player";
import Card from "./Card";
import Wizzard from "./Wizzard";
import compareCards from "./compareCards";
import { SocketInteractions, PlayerInteractions, PlayerCardCombo } from './Types';

type SubRoundOptions = {
    players: Player[],
	currentRound: number,
    shareUpdates: Function,
    trumpf: Card,
}

/**
 * SubRound
 * 
 * Used to keep track of each subround
 *
 * @export
 * @class SubRound
 */
export default class SubRound {
    round: number;
    players: Player[];
    playedCards: PlayerCardCombo[];
    shareUpdates: Function;
    bestCard?: PlayerCardCombo; 
    currentPlayer?: Player;
    trumpf?: Card;

    constructor(options: SubRoundOptions) {
        this.round = options.currentRound;
        this.players = options.players;
        this.shareUpdates = options.shareUpdates;
        this.trumpf = options.trumpf;
        this.playedCards = [];
    }

    /**
     * start
     *
     * @memberof SubRound
     */
    start() {
        this.subscribeToPlayerInteractions();

        this.setCurrentPlayer();
    }

    /**
     * end
     *
     * @memberof SubRound
     */
    end() {
        this.bestCard!.player.increaseWins();
        this.shareUpdates();
    }

    /**
     * setCurrentPlayer
     *
     * @memberof SubRound
     */
    setCurrentPlayer() {

        // end the game if no more players are in the subround
        if ( !this.players.length ) {
            this.end();
            return;
        }

        // loop over the players and get the first one that doesn't have a prediction jet
        let player = this.players.find( player => player.prediction === undefined );

        if ( player ) {
            // if there is a user without predictions set that player as the current player
            this.currentPlayer = player;
        } else {
            // if there are no players without predictions get the first player from the array 
            player = this.players.shift();
        }

        // set the current player
        this.currentPlayer = player;

    }

    /**
     * handlePlayerGavePrediction
     *
     * @param {Player} player
     * @memberof SubRound
     */
    handlePlayerGavePrediction( player: Player ) {
        
    }

    /**
     * handlePlayerPlayedCard
     *
     * @param {Card} card
     * @param {Player} player
     * @memberof SubRound
     */
    handlePlayerPlayedCard( card: Card, player: Player ) {

        const isNewBestCard = compareCards( 
            this.bestCard?.card ?? this.playedCards[this.playedCards.length -1].card,
            card,
            this.trumpf?.color );

        if ( isNewBestCard ) {
            this.bestCard = {player, card};
        }

        this.playedCards.push( { player, card } );
    }

    /**
     * attach listener to the socket of each player.
     * The goal is to subscribe to the player_interaction updates that are
     * send from each individual player.
     *
     * @memberof SubRound
     */
    subscribeToPlayerInteractions() {

        this.players.map( player => {

            player.socket?.on( SocketInteractions.recivePlayerInteraction, ( { id, type, value } ) => {
                if ( ! (id === player.id) ) {
                    throw new Error( 'This message was not intended for this Player' );
                }
    
                if ( type === PlayerInteractions.recivePrediction ) {
                    player.setPrediction( value );
                    this.handlePlayerGavePrediction( player );
                }
                
                if ( type === PlayerInteractions.reciveMove ) {
                    const card = player.playCard( value )
                    this.handlePlayerPlayedCard( card, player );
                }
            } );

        } )
	}
}
