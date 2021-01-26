import express from "express";
import http from "http";
import socketio from 'socket.io';

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
	socket.emit(
		SocketInteractions.sharePlayersList,
		players.map(player => player.publicInfo)
	);

	socket.on(SocketInteractions.createPlayer, player => {
		const newPlayer = new Player({
			name: player.name,
			id: socket.id,
			socket
		});
		players.push(newPlayer);
		log.success( `Adding ${newPlayer.name}` );
		io.emit(
			SocketInteractions.sharePlayersList,
			players.map(player => player.publicInfo)
		);
	});

	socket.on('disconnect', () => {
		const player = players.find( player => player.id === socket.id );

		// bail early if no player exists
		if ( !player ) {
			return;
		}

		const index = players.indexOf(player);
		log.error(`removing ${player.name}`)
		players.splice(index, 1);
		io.emit(
			SocketInteractions.sharePlayersList,
			players.map(player => player.publicInfo)
		);
	} );

	socket.on( SocketInteractions.startGame, () => {
		log.success("Game Starting");
		log.code('');

		io.emit( SocketInteractions.gameStarted, true );
		game = new Wizzard(players, io );
	});
});

const port = process.env.PORT || 5000;

server.listen(port, function() {
	log.code(`App is listening on port: ${port}`);
	log.code('');
});
