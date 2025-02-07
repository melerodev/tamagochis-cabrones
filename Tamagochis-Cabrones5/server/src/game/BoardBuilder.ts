import { Board } from "./entities/Board";

export enum Elements {
    BUSH = 5,
    PLAYER = 1,
}

export class BoardBuilder {
    private board: Board;
    private map: Array<number[]>;
    
    constructor() {
        this.board = {
            size: 10,
            elements: []
        }
        this.map = [
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
        this.buildElements();
    }

    public buildElements() : void {
        for (let i = 0; i < this.board.size; i++)
            for(let j = 0; j < this.board.size; j++)
                if (this.map[i][j] == Elements.BUSH) {
                    if (!this.board.elements.some(element => element.x === i && element.y === j)) { // verificar si dentro this.board.elements ya existe un elemento en esa posición
                        this.board.elements.push({x : i, y : j , type : Elements.BUSH});
                    }
                    this.board.elements.push({x : i, y : j , type : Elements.BUSH});
                } else if (this.map[i][j] == Elements.PLAYER) {
                    if (!this.board.elements.some(element => element.x === i && element.y === j)) {
                        this.board.elements.push({x : i, y : j , type : Elements.PLAYER});
                    }
                }
    }

    public getBoard() : Board {
        return this.board;
    }

    public addPlayers(players: number) {
        const corners = [{ x: 0, y: 0 },{ x: 0, y: this.board.size -1 },{ x: this.board.size -1 , y: 0 },{ x: this.board.size -1, y: this.board.size -1 }];
        var occupied = true;
        var coords = 0;

        while (occupied) {
            coords = Math.floor(Math.random() * corners.length);
            if (this.map[corners[coords].x][corners[coords].y] != Elements.PLAYER) {
                occupied = false;
            } else {
                console.log("Ocupado");
            }
        }
        console.log(corners[coords]);

        this.map[corners[coords].x][corners[coords].y] = Elements.PLAYER;


        this.buildElements();
    }
}