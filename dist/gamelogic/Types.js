"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = exports.PlayerInteractions = exports.SocketInteractions = void 0;
var SocketInteractions;
(function (SocketInteractions) {
    SocketInteractions["recivePlayerInteraction"] = "player_interaction";
    SocketInteractions["shareGameState"] = "share_game_state";
    SocketInteractions["sharePlayerState"] = "share_player_state";
})(SocketInteractions = exports.SocketInteractions || (exports.SocketInteractions = {}));
;
var PlayerInteractions;
(function (PlayerInteractions) {
    PlayerInteractions[PlayerInteractions["recivePrediction"] = 0] = "recivePrediction";
    PlayerInteractions[PlayerInteractions["reciveMove"] = 1] = "reciveMove";
})(PlayerInteractions = exports.PlayerInteractions || (exports.PlayerInteractions = {}));
;
var GameState;
(function (GameState) {
    GameState[GameState["Created"] = 0] = "Created";
    GameState[GameState["Started"] = 1] = "Started";
    GameState[GameState["InProgress"] = 2] = "InProgress";
    GameState[GameState["Completed"] = 3] = "Completed";
})(GameState = exports.GameState || (exports.GameState = {}));
;
