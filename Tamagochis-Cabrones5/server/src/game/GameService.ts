import { Socket } from "socket.io";
import { Directions, Player, PlayerStates } from "../player/entities/Player";
import { Room } from "../room/entities/Room";
import { RoomConfig } from "../room/entities/Room";
import { RoomService } from "../room/RoomService";
import { Game, GameStates, Messages } from "./entities/Game";
import { BoardBuilder } from "./BoardBuilder";
import { ServerService } from "../server/ServerService"
import { ConnectionStates } from "mongoose";
import { checkPrimeSync } from "crypto";
import { copyFileSync } from "fs";
export class GameService {
    private games: Game[];

    private static instance: GameService;
    private constructor() {
        this.games = [];
    };

    static getInstance(): GameService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GameService();
        return this.instance;
    }

    public buildPlayer(socket: Socket): Player {
        return {
            id: socket,
            x: 0,
            y: 0,
            state: PlayerStates.Idle,
            direction: Directions.Up,
            visibility: true
        }
    }

    public addPlayer(player: Player): boolean {
        const room: Room = RoomService.getInstance().addPlayer(player);
        ServerService.getInstance().sendMessage(room.name, Messages.NEW_PLAYER, "new player");
        const genRanHex = (size: Number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        if (room.players.length == 1) {
            const board = new BoardBuilder();
            const game: Game = {
                id: "game" + genRanHex(128),
                state: GameStates.WAITING,
                room: room,
                board: board.getBoard(),
                boarInstance : board
            }
            room.game = game;
            this.games.push(game);
        }

        room.game?.boarInstance.addPlayers(player);

        if (room.occupied) {
            if (room.game) {
                room.game.state = GameStates.PLAYING;
                if (ServerService.getInstance().isActive()) {
                    ServerService.getInstance().sendMessage(room.name, Messages.BOARD, room.game.board);
                }
            }
            return true;
        } else {
            console.log("¡Quedan " + (RoomConfig.maxRoomPlayers - room.players.length) + " jugadores para empezar ♟️ !"); 
        }

        return false;
    }

    public removePlayer(socket: Socket) {
        var currentGame: Game | undefined;
        
        this.games.forEach(element => {
            currentGame = element;
        });

        var player = currentGame?.room.players.find(player => player.id.id == socket.id);
        
        if (currentGame) {
            currentGame.boarInstance.removePlayerFromBoard(player);
        }
        
        RoomService.getInstance().removePlayer(socket.id);

        ServerService.getInstance().sendMessage(currentGame?.room.name ?? null, Messages.BOARD, currentGame?.room.game?.board);
    }
}
