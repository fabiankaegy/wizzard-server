import express from "express";
import http from "http";
import socketio from 'socket.io';
import path from 'path';

import Wizzard from "./gamelogic/Wizzard";
import Player from "./gamelogic/Player";
import { SocketInteractions } from "./gamelogic/Types";
import log from './helper';

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
		const newPlayer = new Player({
			name: player.name,
			id: socket.id,
			socket
		});
		players.push(newPlayer);
		io.emit(
			SocketInteractions.sharePlayersList,
			players.map(player => player.publicInfo)
		);
	});

	socket.on( SocketInteractions.startGame, () => {
		log.success("Game Starting");
		log.code('');

		io.emit( SocketInteractions.gameStarted, true );
		game = new Wizzard(players, io );
	});
});

// Handles any requests that don't match the ones above
app.get('*', express.static( path.join(__dirname+'/client/build/')) );

const port = process.env.PORT || 5000;

server.listen(port, function() {
	log.code(`App is listening on port: ${port}`);
	log.code('');
});
