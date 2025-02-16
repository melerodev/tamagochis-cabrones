import { Directions, Player, PlayerStates } from "../../player/entities/Player";
import { Elements } from "../BoardBuilder";

export interface Element {
    id : String | null;
    x : number;
    y : number; 
    type: Elements;
    direction : Directions | null;
    state: PlayerStates | null;
    visibility: boolean | null;
}

export interface Board {
    size: number;
    elements: Array<Element>;
}