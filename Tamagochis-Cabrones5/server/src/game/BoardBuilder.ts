import { ConnectionStates } from "mongoose";
import { Player } from "../player/entities/Player";
import { Board } from "./entities/Board";
import { constrainedMemory } from "process";

export enum Elements {
    BUSH = 5,
    PLAYER = 1,
    EMPTY = 0
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

    public buildElements() : void | Array<{x: number, y: number, type: Elements}> {
        console.log("Lo que tengo antes de la catástrofe: ");
        console.log(this.map);

        for (let i = 0; i < this.board.size; i++)
            for(let j = 0; j < this.board.size; j++)
                if (this.map[i][j] == Elements.BUSH) {
                    // if (!this.board.elements.some(element => element.x === i && element.y === j)) { // verificar si dentro this.board.elements ya existe un elemento en esa posición
                        this.board.elements.push({x : i, y : j , type : Elements.BUSH});
                    // }
                    
                    // var dataDuplicated = false;

                    // this.board.elements.forEach(element => {
                    //     if (element.x === i && element.y === j) {
                    //         dataDuplicated = true;
                    //         return;
                    //     }
                    // });

                    // if (!dataDuplicated) {
                    //     this.board.elements.push({x : i, y : j , type : Elements.BUSH});
                    // } else {
                    //     console.log("Duplicated data");
                    // }
                } else if (this.map[i][j] == Elements.PLAYER) {
                    // if (!this.board.elements.some(element => element.x === i && element.y === j)) {
                        
                        // console.log("Añadiendo jugador 🦇🦇🦇");
                        this.board.elements.push({x : i, y : j , type : Elements.PLAYER});
                    // }
                }
        return this.board.elements;
    }

    public getBoard() : Board {
        return this.board;
    }

    // public addPlayers(players: Player[]) {
    //     players.forEach(player => {
    //         console.log(player.x, player.y);

    //         const corners = [{ x: 0, y: 0 },{ x: 0, y: this.board.size -1 },{ x: this.board.size -1 , y: 0 },{ x: this.board.size -1, y: this.board.size -1 }];
    //         var occupied = true;
    //         var coords = 0;
    
    //         while (occupied) {
    //             coords = Math.floor(Math.random() * corners.length);
    //             if (this.map[corners[coords].x][corners[coords].y] != Elements.PLAYER) {
    //                 occupied = false;
    //             }
    //         }
    
    //         this.map[corners[coords].x][corners[coords].y] = Elements.PLAYER;

    //         player.x = corners[coords].x;
    //         player.y = corners[coords].y;
    
    
    //         this.buildElements();
    //     });
    //     console.log("xd");
    // }

    public addPlayers(player: Player) {
        const corners = [{ x: 0, y: 0 },{ x: 0, y: this.board.size -1 },{ x: this.board.size -1 , y: 0 },{ x: this.board.size -1, y: this.board.size -1 }];
        var occupied = true;
        var coords = 0;

        while (occupied) {
            coords = Math.floor(Math.random() * corners.length);
            if (this.map[corners[coords].x][corners[coords].y] != Elements.PLAYER) {
                occupied = false;
            }
        }

        player.x = corners[coords].x;
        player.y = corners[coords].y;

        this.map[corners[coords].x][corners[coords].y] = Elements.PLAYER;


        this.buildElements();
        console.log(`He añadido un jugador ${player.id.id} en la posición (${player.x}, ${player.y})`);
    }

    // public removePlayerFromBoard(player: Player | undefined) {
    //     // if (player) {
    //     //     console.log("Antes: " + this.map[Number(player.x)][Number(player.y)]);
    //     //     this.map[Number(player.x)][Number(player.y)] = Elements.EMPTY;
    //     //     console.log("Después: " + this.map[Number(player.x)][Number(player.y)]);
    //     //     this.buildElements();
    //     //     console.log(`He eliminado un jugador ${player.id.id} en la posición (${player.x}, ${player.y})`);
    //     // } else {
    //     //     console.log("Player is undefined");
    //     // }
    //     console.log("Antes: " + this.map[0][0]);
    //     this.map[0][0] = Elements.EMPTY;
    //     console.log("Después: " + this.map[0][0]);
    //     console.log(this.map);
    //     this.buildElements();
    // }

    public removePlayerFromBoard(player: Player | undefined) {
        if (player) {
            console.log("Antes: " + this.map[Number(player.x)][Number(player.y)]);
            this.map[Number(player.x)][Number(player.y)] = Elements.EMPTY;
            console.log("Después: " + this.map[Number(player.x)][Number(player.y)]);
            
            // ESTO FUNCIONA PERO NO ES COMO YO QUIERO QUE FUNCIONE 😭
            // this.board.elements = this.board.elements.filter(element => !(element.x === player.x && element.y === player.y));
            
            this.buildElements();
            console.log(`He eliminado un jugador ${player.id.id} en la posición (${player.x}, ${player.y})`);
        } else {
            console.log("Player is undefined");
        }
    }
}