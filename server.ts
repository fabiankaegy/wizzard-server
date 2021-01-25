import express, { Request, Response } from "express";
import http from "http";
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

import Wizzard from "./gamelogic/Wizzard";
import Player from "./gamelogic/Player";

app.get("/", function(req: Request, res: Response) {
	res.json({ message: "Hallo Welt!" });
});

let players: Player[];
let game: Wizzard;

io.sockets.on("connection", socket => {
	socket.emit("welcome", {
		players
	});

	socket.on("add_player", player => {
		const newPlayer = new Player(player.name, socket.id, socket);
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

		game.startGame();

		game.players.forEach( (player: Player) => {
			sendUpdatedPlayer(player);
		});

		io.emit("set_trumpf", { trumpf: game.currentTrump });
	});

	socket.on("play_card", payload => {
		const { card, player } = payload;
		console.log(`${player.name} played ${card.color}${card.value}`);
		const livePlayer = game.findPlayer(player.id);
		const cardIndex = livePlayer.findCardIndex(card);
		livePlayer.playCard(cardIndex);
		sendUpdatedPlayer(livePlayer);
	});

	const sendUpdatedPlayer = (player: Player) => {
		const socket = io.to(player.id);
		socket.emit("player_updated", player);
	};
});

server.listen(3000, function() {
	console.log("listening on *:3000");
});
