import { Directions, PlayerStates } from "../../player/entities/Player";
import { Room } from "../../room/entities/Room";
import { BoardBuilder } from "../BoardBuilder";
import { Board } from "./Board";

export enum GameStates {
    WAITING, PLAYING
}

export enum Messages {
    BOARD = "BOARD",
    NEW_PLAYER = "NEW_PLAYER",
    DISCONECTED = "DISCONECTED",
    MOVEMENT = "MOVEMENT",
    SHOT = "SHOT",
}

export enum Keys {
    ArrowUp = "ArrowUp",
    ArrowDown = "ArrowDown",
    ArrowLeft = "ArrowLeft",
    ArrowRight = "ArrowRight",
    R = "r", // Rotar
    Space = " " // Matar
}

export interface MoveResult {
    x: number;
    y: number;
    visibility: boolean;
    direction: Directions;
    state: PlayerStates;
}

export interface Game {
    id : String,
    state: GameStates,
    room: Room,
    board: Board,
    boarInstance: BoardBuilder
}