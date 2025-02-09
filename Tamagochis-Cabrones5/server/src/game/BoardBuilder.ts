import { Player } from "../player/entities/Player";
import { Board } from "./entities/Board";

export enum Elements {
    BUSH = 5,
    PLAYER = 1,
    EMPTY = 0
}

export class BoardBuilder {
    private board: Board;
    
    constructor() {
        this.board = {
            size: 10,
            elements: []
        }
        const map : Array<number[]> = [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,5,0,0,0],
            [0,5,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,5,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,5,0],
            [0,0,5,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,5,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ]
        for(let i = 0; i < this.board.size; i++)
            for(let j = 0; j < this.board.size; j++)
                if(map[i][j] != Elements.EMPTY) {
                    this.board.elements.push({x : i, y : j, type : Elements.BUSH});
                }
    }


    public getBoard() : Board {
        return this.board;
    }

    public addPlayers(player: Player) {
        const corners = [{ x: 0, y: 0 },{ x: 0, y: this.board.size -1 },{ x: this.board.size -1 , y: 0 },{ x: this.board.size -1, y: this.board.size -1 }];
        var occupied = true;
        var coords = 0;

        while (occupied) {
            coords = Math.floor(Math.random() * corners.length);
            if (this.board.elements.filter(element => element.x === corners[coords].x && element.y === corners[coords].y).length === 0) {
                occupied = false;
            }
        }

        player.x = corners[coords].x;
        player.y = corners[coords].y;

        this.board.elements.push({x : corners[coords].y, y : corners[coords].y, type : Elements.PLAYER});

        console.log(`He añadido un jugador ${player.id.id} en la posición (${player.x}, ${player.y})`);
    }

    public removePlayerFromBoard(player: Player | undefined) {
        if (!player) return;
        
        this.board.elements = this.board.elements.filter(element => !(element.x === player.x && element.y === player.y));
        
        console.log(`He eliminado un jugador ${player.id.id} en la posición (${player.x}, ${player.y})`);
    }
}