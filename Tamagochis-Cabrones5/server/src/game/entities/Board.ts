import { Player, PlayerStates } from "../../player/entities/Player";
import { Elements } from "../BoardBuilder";

export interface Element {
    x : number;
    y : number; 
    type: Elements;
    state: PlayerStates | null;
    visibility: boolean | null;
}

export interface Board {
    size: number;
    elements: Array<Element>;
}