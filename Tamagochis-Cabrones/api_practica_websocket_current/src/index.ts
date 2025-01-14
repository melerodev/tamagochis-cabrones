import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { Player } from './player/entities/Player';
import { RoomService } from './room/RoomService';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

const httpServer = http.createServer();

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    const roomInstace = RoomService.getInstance();

    console.log('Un cliente se ha conectado:', socket.id);

    socket.emit("connectionStatus", { status: true });

    const player: Player = {
        id: socket,
        x: 0,
        y: 0,
        status: 0,
        direction: 0,
        visibility: true
    }

    roomInstace.addPlayer(player);
    socket.emit("game", {
        type : "newPlayer",
    })

    socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data);
        socket.emit('respuesta', { mensaje: 'Mensaje recibido con éxito.' });
    });

    // cuando se desconecta un jugador a este se le elimina de la sala y se notifica a los demás jugadores
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado:', socket.id);
        roomInstace.removePlayer(player);
        if (roomInstace.getNumPlayersInRoom(roomInstace.getRoomByPlayer(player)) == 0) { // si la sala queda vacía se elimina
            roomInstace.deleteRoom(roomInstace.getRoomByPlayer(player));
        }
    });
});


app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: 'Hello World!',
    });
});


try {
    httpServer.listen(PORT, (): void => {
        console.log(`Connected successfully on port ${PORT}`);
    });
} catch (error: any) {
    console.error(`Error occurred: ${error.message}`);
}

