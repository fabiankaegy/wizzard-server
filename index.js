var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const Wizzard = require("./gamelogic/Wizzard");
const Player = require("./gamelogic/Player");
const compareCards = require("./gamelogic/compareCards");
const { values, colors } = require("./gamelogic/general");

app.get("/", function(req, res) {
	res.json({ message: "Hallo Welt!" });
});

let players = [];
let game;

io.sockets.on("connection", socket => {
	socket.emit("welcome", {
		players
	});

	socket.on("add_player", player => {
		const newPlayer = new Player(player.name, socket.id);
		players.push(newPlayer);
		socket.emit("player_created", newPlayer);
		io.emit(
			"player_added",
			players.map(player => {
				return {
					name: player.name,
					id: player.id
				};
			})
		);
	});

	socket.on("start_game", () => {
		console.log("Game Starting");
		game = new Wizzard(players);
		players = [];
		game.currentRound = 5;
		io.emit("game_start", {
			rounds: game.rounds,
			currentRound: game.currentRound
		});

		game.startRound();

		game.players.forEach(player => {
			sendUpdatedPlayer(player);
		});

		io.emit("set_trumpf", { trumpf: game.currentTrump });
	});

	socket.on("play_card", payload => {
		const { card, player } = payload;
		console.log(`${player.name} played ${card.color}${card.value}`);
		livePlayer = game.findPlayer(player.id);
		cardIndex = livePlayer.findCardIndex(card);
		livePlayer.playCard(cardIndex);
		sendUpdatedPlayer(livePlayer);
	});

	const sendUpdatedPlayer = player => {
		const socket = io.to(player.id);
		socket.emit("player_updated", player);
	};
});

http.listen(3000, function() {
	console.log("listening on *:3000");
});
