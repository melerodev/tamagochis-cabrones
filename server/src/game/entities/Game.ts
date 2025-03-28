import { Directions, Player, PlayerStates } from "../../player/entities/Player";
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
    ROTATE = "ROTATE",
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
    id : String;
    x: number;
    y: number;
    visibility: boolean;
    direction: Directions;
    state: PlayerStates;
}

export interface RotateResult {
    id : String;
    direction: Directions;
}


export interface ShotResult {
    id : String;
    gameOver: boolean | null;
    playerName: String | null;
}

export interface Game {
    id : String,
    state: GameStates,
    room: Room,
    board: Board,
    boarInstance: BoardBuilder
}