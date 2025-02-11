import { Socket } from "socket.io";

export enum Directions {
    Up = "UP", 
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
    Idle = "IDLE"
}

export enum PlayerStates {
    No_Connected, Idle, Moving, Hidden, Dead
}

export interface Player {
    id: Socket;
    name: String;
    x: Number;
    y: Number;
    state: PlayerStates;
    direction: Directions;
    visibility: Boolean;
}
