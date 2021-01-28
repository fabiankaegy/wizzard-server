import Player from './Player';
import Card from './Card';

enum SocketInteractions {
    recivePlayerInteraction = 'player_interaction',
    startGame = 'start_game',
    gameStarted = 'game_started',
    welcome = 'welcome',
    shareGameState = 'share_game_state',
	sharePlayerState = 'share_player_state', 
	createPlayer = 'create_player',
	playerCreated = 'player_created', // used to share the private player info before the game started
	sharePlayersList = 'share_players_list', // used to share the list of players public info before the game started
};

type SocketInteraction = keyof SocketInteractions;

enum PlayerInteractions {
	recivePrediction = 'recive_prediction',
	predictionRecived = 'prediction_recived',
	reciveMove = 'recive_move',
	moveRecived = 'move_recived',
	requestPrediction = 'request_prediction',
	requestMove = 'request_move',
};

enum GameState {
	Created,
	Started,
	InProgress,
	Completed
};

interface PlayerCardCombo {
    player: Player,
    card: Card,
}

export {
	SocketInteractions,
	SocketInteraction,
	PlayerInteractions,
	GameState,
	PlayerCardCombo
}
