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

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

let players = 0;

io.on('connection', (socket) => {
    const roomInstance = RoomService.getInstance();

    players++;
    io.emit("updatePlayers", players);
    console.log('Un cliente se ha conectado:', socket.id);
    console.log(`Total jugadores: ${players}`);

    socket.emit("connectionStatus", { status: true });

    const player: Player = {
        id: socket,
        x: 0,
        y: 0,
        status: 0,
        direction: 0,
        visibility: true
    }
    
    try {
        roomInstance.addPlayer(player);
    } catch (error: any) {
        console.error(`Error occurred: ${error.message}`);
    }

    socket.emit("game", {
        type: "newPlayer",
    })

    const room = roomInstance.getRoomByPlayer(player);
    if (room && roomInstance.getNumPlayersInRoom(room) == 4) {
        room.occupied = true;
        console.log("The room is full/occupied");
    }

    socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data);
        socket.emit('respuesta', { mensaje: 'Mensaje recibido con éxito.' });
    });

    socket.on('disconnect', () => {
        players--;
        io.emit("updatePlayers", players);
        console.log('Un cliente se ha desconectado:', socket.id);
        console.log(`Total jugadores: ${players}`);
        try {
            roomInstance.removePlayer(player);
        } catch (error: any) {
            console.error(`Error occurred: ${error.message}`);
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
