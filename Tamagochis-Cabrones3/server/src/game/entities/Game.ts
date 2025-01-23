import { Room } from "../../room/entities/Room";
import { Board } from "./Board";

export enum GameStates {
    WAITING, PLAYING
}

export enum Message {
    BOARD = "BOARD",
    PLAYER = "PLAYER",
    DISCONNECTED = "DISCONNECTED"
}

export interface Game {
    id : String,
    state: GameStates,
    room: Room,
    board: Board
}