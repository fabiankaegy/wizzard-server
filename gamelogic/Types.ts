import Player from './Player';
import Card from './Card';

export enum SocketInteractions {
    recivePlayerInteraction = 'player_interaction',
    shareGameState = 'share_game_state',
    sharePlayerState = 'share_player_state',
};

export enum PlayerInteractions {
	recivePrediction,
	reciveMove
};

export enum GameState {
	Created,
	Started,
	InProgress,
	Completed
};

export interface PlayerCardCombo {
    player: Player,
    card: Card,
}
