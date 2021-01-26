import express, { Request, Response } from "express";
import http from "http";
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

import Wizzard from "./gamelogic/Wizzard";
import Player from "./gamelogic/Player";

app.get("/", function(req: Request, res: Response) {
	res.json({ message: "Hello World!" });
});

let players: Player[] = [];
let game: Wizzard;

io.sockets.on("connection", socket => {
	socket.emit("welcome", {
		players
	});

	socket.on("add_player", player => {
		const newPlayer = new Player(player.name, socket.id, socket);
		players.push(newPlayer);
		socket.emit("player_created", newPlayer.privateInfo);
		io.emit(
			"player_added",
			players.map(player => player.publicInfo)
		);
	});

	socket.on("start_game", () => {
		console.log("Game Starting");
		game = new Wizzard(players, io );
	});
});

io.sockets.on( 'reconnect', () => {
	if ( game ) {
		game.shareGameState();
	}
} )

server.listen(3000, function() {
	console.log("listening on *:3000");
});
