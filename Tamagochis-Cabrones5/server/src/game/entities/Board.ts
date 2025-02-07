import { Player } from "../../player/entities/Player";
import { Elements } from "../BoardBuilder";

export interface Element {
    x : number;
    y : number; 
    type: Elements;
}

export interface Board {
    size: number;
    elements: Array<Element>;
}