import { DefaultEventsMap, Server, Socket } from 'socket.io';
import http from 'http';
import { Directions, Player, PlayerStates } from '../player/entities/Player';
import { GameService } from '../game/GameService';

export class ServerService {
    private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | null;
    private active : boolean;
    private messages = [
        ""
    ]

    private static instance: ServerService;
    private constructor() {
        this.io = null;
        this.active = false;
    };

    static getInstance(): ServerService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ServerService();
        return this.instance;
    }

    public init(httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
        this.io = new Server(httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });
        this.active = true;

        this.io.on('connection', (socket) => {
            // socket.emit("connectionStatus", { status: true });
            // GameService.getInstance().addPlayer(GameService.getInstance().buildPlayer(socket));
            console.log('Un cliente se ha conectado:', socket.id);

            const player = GameService.getInstance().buildPlayer(socket);
            GameService.getInstance().addPlayer(player);

            // emitir un evento con los datos del tablero a los jugadores
            const game = GameService.getInstance().getGameByPlayer(player);
            if (game) {
                socket.emit ('board', game.board);
                console.log('Enviando tablero a:', socket.id);
            }
            
            socket.on('disconnect', () => {
                console.log('Un cliente se ha desconectado:', socket.id);
                GameService.getInstance().removePlayer(player);
            });
        });
    }

    public addPlayerToRoom(player : Socket, room: String) {
        player.join(room.toString());
    }

    public gameStartMessage() {
        //
    }

    public isActive() {
        return this.active;
    }
}