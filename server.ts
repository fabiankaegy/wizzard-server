import express from "express";
import http from "http";
import socketio, { Socket } from 'socket.io';
import path from 'path';

import Wizzard from "./gamelogic/Wizzard";
import Player from "./gamelogic/Player";
import { SocketInteractions } from "./gamelogic/Types";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let players: Player[] = [];
let game: Wizzard;

io.sockets.on("connection", socket => {
	socket.emit( SocketInteractions.welcome , {
		players
	});

	socket.on(SocketInteractions.createPlayer, player => {
		const newPlayer = new Player(player.name, socket.id, socket);
		players.push(newPlayer);
		socket.emit( SocketInteractions.playerCreated, newPlayer.privateInfo);
		io.emit(
			SocketInteractions.sharePlayersList,
			players.map(player => player.publicInfo)
		);
	});

	socket.on( SocketInteractions.startGame, () => {
		console.log("Game Starting");
		game = new Wizzard(players, io );
	});
});

// Handles any requests that don't match the ones above
app.get('*', express.static( path.join(__dirname+'/client/build/')) );

const port = process.env.PORT || 5000;

server.listen(port, function() {
	console.log(`App is listening on port ${port}`);
});
