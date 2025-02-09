import { Room } from "../../room/entities/Room";
import { BoardBuilder } from "../BoardBuilder";
import { Board } from "./Board";

export enum GameStates {
    WAITING, PLAYING
}

export enum Messages {
    BOARD = "BOARD",
    NEW_PLAYER = "NEW_PLAYER",
    DISCONECTED = "DISCONECTED"
}

export interface Game {
    id : String,
    state: GameStates,
    room: Room,
    board: Board,
    boarInstance: BoardBuilder
}