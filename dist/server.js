"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
var Wizzard_1 = __importDefault(require("./gamelogic/Wizzard"));
var Player_1 = __importDefault(require("./gamelogic/Player"));
app.get("/", function (req, res) {
    res.json({ message: "Hallo Welt!" });
});
var players;
var game;
io.sockets.on("connection", function (socket) {
    socket.emit("welcome", {
        players: players
    });
    socket.on("add_player", function (player) {
        var newPlayer = new Player_1.default(player.name, socket.id, socket);
        players.push(newPlayer);
        socket.emit("player_created", newPlayer);
        io.emit("player_added", players.map(function (player) {
            return {
                name: player.name,
                id: player.id
            };
        }));
    });
    socket.on("start_game", function () {
        console.log("Game Starting");
        game = new Wizzard_1.default(players);
        players = [];
        game.currentRound = 5;
        io.emit("game_start", {
            rounds: game.rounds,
            currentRound: game.currentRound
        });
        game.startGame();
        game.players.forEach(function (player) {
            sendUpdatedPlayer(player);
        });
        io.emit("set_trumpf", { trumpf: game.currentTrump });
    });
    socket.on("play_card", function (payload) {
        var card = payload.card, player = payload.player;
        console.log(player.name + " played " + card.color + card.value);
        var livePlayer = game.findPlayer(player.id);
        var cardIndex = livePlayer.findCardIndex(card);
        livePlayer.playCard(cardIndex);
        sendUpdatedPlayer(livePlayer);
    });
    var sendUpdatedPlayer = function (player) {
        var socket = io.to(player.id);
        socket.emit("player_updated", player);
    };
});
server.listen(3000, function () {
    console.log("listening on *:3000");
});
