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
    res.json({ message: "Hello World!" });
});
var players = [];
var game;
io.sockets.on("connection", function (socket) {
    socket.emit("welcome", {
        players: players
    });
    socket.on("add_player", function (player) {
        var newPlayer = new Player_1.default(player.name, socket.id, socket);
        players.push(newPlayer);
        socket.emit("player_created", newPlayer.privateInfo);
        io.emit("player_added", players.map(function (player) { return player.publicInfo; }));
    });
    socket.on("start_game", function () {
        console.log("Game Starting");
        game = new Wizzard_1.default(players, io);
    });
});
io.sockets.on('reconnect', function () {
    if (game) {
        game.shareGameState();
    }
});
server.listen(3000, function () {
    console.log("listening on *:3000");
});
