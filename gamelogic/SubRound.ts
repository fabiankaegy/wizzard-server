import Player from "./Player";
import Card from "./Card";
import compareCards from "./compareCards";
import { SocketInteractions, PlayerInteractions, PlayerCardCombo } from './Types';
import log from "../helper";

type SubRoundOptions = {
    players: Player[],
	currentRound: number,
    shareUpdates: Function,
    trumpf?: Card,
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

        this.start = this.start.bind( this );
        this.end = this.end.bind( this );
        this.setCurrentPlayer = this.setCurrentPlayer.bind( this );
        this.startPlayerMove = this.startPlayerMove.bind( this );
        this.handlePlayerGavePrediction = this.handlePlayerGavePrediction.bind( this );
        this.handlePlayerPlayedCard = this.handlePlayerPlayedCard.bind( this );
        this.subscribeToPlayerInteractions = this.subscribeToPlayerInteractions.bind( this );

        this.start();
    }

    /**
     * start
     *
     * @memberof SubRound
     */
    start() {
        this.subscribeToPlayerInteractions();

        this.setCurrentPlayer();
        this.shareUpdates();
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
        };

        // set the current player
        this.currentPlayer = player;

        log.info( `Set Current Player to ${this.currentPlayer?.name}` )

        this.startPlayerMove();
    }

    /**
     * startPlayerMove
     *
     * @memberof SubRound
     */
    startPlayerMove() {
        if ( ! this.currentPlayer?.prediction ) {
            this.currentPlayer?.requestPlayerPrediction();
        } else {
            this.currentPlayer?.requestPlayerMove();
        }
    }

    /**
     * handlePlayerGavePrediction
     *
     * @param {Player} player
     * @memberof SubRound
     */
    handlePlayerGavePrediction( player: Player ) {
        this.setCurrentPlayer();
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

                log.info( `${player.name} send:` )
                log.info( value );
                log.info( '' );

                if ( ! (id === player.id) ) {
                    log.error( 'This message was not intended for this Player' );
                    throw new Error( 'This message was not intended for this Player' );
                }
    
                if ( type === PlayerInteractions.recivePrediction ) {
                    log.success( `${player.name} predicted ${value}` );
                    log.info('');
                    player.setPrediction( Number(value) );
                    player.socket?.emit( PlayerInteractions.predictionRecived )
                    this.handlePlayerGavePrediction( player );
                }
                
                if ( type === PlayerInteractions.reciveMove ) {
                    const card = new Card(value.color, value.value.number);
                    const index = player.findCardIndex(card);
                    const playedCard = player.playCard(index);
                    log.success( `${player.name} played card Nr.: ${card.name}` );
                    log.info('');
                    this.handlePlayerPlayedCard( playedCard, player );
                }
            } );

        } )
	}
}
