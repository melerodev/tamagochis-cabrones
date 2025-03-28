import { DefaultEventsMap, Server, Socket } from 'socket.io';
import http from 'http';
import { GameService } from '../game/GameService';
import { AnyTxtRecord } from 'dns';
import { RoomConfig } from '../room/entities/Room';
import { RoomService } from '../room/RoomService';
import { Messages } from '../game/entities/Game';

export class ServerService {
    private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | null;
    private active : boolean;
    static messages = {
        out: {
            new_player: "NEW_PLAYER"
        } 
    }

    public inputMessage = [
            {
                type: "ACTION",
                do: this.doAction
            }
        ];

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
            console.log('Un cliente se ha conectado:', socket.id);
            socket.emit("connectionStatus", { status: true });
            GameService.getInstance().addPlayer(GameService.getInstance().buildPlayer(socket));
            
            socket.on("message", (data)=>{
                const doType = this.inputMessage.find(item => item.type == data.type);
                if (doType !== undefined) {
                    doType.do(data);
                }
            })

            socket.on('disconnect', () => {
                console.log('Un cliente se ha desconectado:', socket.id);

                const room = RoomService.getInstance().getRoomByPlayer(socket.id);
                if (room?.name) {
                    this.sendMessage(room?.name, Messages.DISCONECTED, socket.id);
                }

                GameService.getInstance().removePlayer(socket);
            });
        });
    }

    public addPlayerToRoom(player : Socket, room: String) {
        player.join(room.toString());
    }

    public sendMessage(room: String |null ,type: String, content: any) {
        if (this.active && this.io!=null) {
            if (room != null) {
                    this.io?.to(room.toString()).emit("message", {
                        type, content
                    })
            }
        }
    }

    public gameStartMessage() {
        //
    }

    public isActive() {
        return this.active;
    }

    // private doHello(data: String) {
    //     console.log("Hola");
    //     console.log(data);
    // }

    // private doBye(data: String) {
    //     console.log("Adios");
    //     console.log(data);
    // }
    
    private doAction(data: any) {
        GameService.getInstance().doAction(data.data.socketId, data.data.key);
    }
}