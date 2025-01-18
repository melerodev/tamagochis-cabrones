import { DefaultEventsMap, Server, Socket } from 'socket.io';
import http from 'http';
import { Directions, Player, PlayerStates } from '../player/entities/Player';
import { GameService } from '../game/GameService';
import { ActionType } from './MessageList';
import { Movement } from './Doins/Movement';  

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

            const game = GameService.getInstance().getGameByPlayer(player);
            console.log(game);

            if (game) {
                // console.log(game);
                socket.emit ('board', {
                    id : game.id,
                    state: game.state,
                    // room: game.room **si intento enviar la sala, se rompe**
                    board: game.board,
                    numberOfPlayers: game.numberOfPlayers
                });
                console.log('Enviando tablero a:', socket.id);
            }

            socket.on('message' , (data) => {
                data = data.toUpperCase();
                if (Object.values(ActionType).includes(data)) {
                    switch (data) {
                        case data = ActionType.Start:
                            console.log('Inicio de juego');
                            break;
                        case data = ActionType.Movement:
                            new Movement().do();
                            break;
                        case data = ActionType.Kill:
                            console.log('Muerte');
                            break;
                        case data = ActionType.Rotate:
                            console.log('Rotación');
                            break;
                        case data = ActionType.Hided:
                            console.log('Oculto');
                            break;
                        default:
                            console.log('No se encontró ninguna acción con el nombre:', data);
                            break;
                    }
                }
            });
            
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