import { Directions, Player, PlayerStates } from "../player/entities/Player";
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
                    this.board.elements.push({x : i, y : j, type : Elements.BUSH, state: null, visibility: null});
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

        this.board.elements.push({x : corners[coords].x, y : corners[coords].y, type : Elements.PLAYER, state: player.state, visibility: Boolean(player.visibility)});

        console.log(`He añadido un jugador ${player.id.id} en la posición (${player.x}, ${player.y})`);
    }

    public removePlayerFromBoard(player: Player | undefined) {
        if (!player) return;
        
        this.board.elements = this.board.elements.filter(element => !(element.x === player.x && element.y === player.y));
        
        console.log(`He eliminado un jugador ${player.id.id} en la posición (${player.x}, ${player.y})`);
    }

    public movePlayer(player: Player, direction: Directions) {
        const newCoords = { x: Number(player.x), y: Number(player.y) };
        console.log(`Coordenas del jugador antes de modificarlas (${player.x}, ${player.y})`);
    
        switch (direction) {
            case "UP":
                newCoords.x--;
                break;
            case "DOWN":
                newCoords.x++;
                break;
            case "LEFT":
                newCoords.y--;
                break;
            case "RIGHT":
                newCoords.y++;
                break;
            default:
                console.warn("Dirección no válida");
                return;
        }
    
        if (newCoords.x < 0 || newCoords.y < 0 || newCoords.x >= this.board.size || newCoords.y >= this.board.size) {
            console.log(`El jugador ${player.name} quiere salir fuera de los límites del tablero.`);
            return;
        }
    
        const elementAtNewPos = this.board.elements.find(element => element.x === newCoords.x && element.y === newCoords.y);
        if (elementAtNewPos && elementAtNewPos.type === Elements.BUSH) {
            player.visibility = false;
        }

        if (elementAtNewPos && elementAtNewPos.type === Elements.PLAYER) {
            return;
        }
    
        this.board.elements = this.board.elements.filter(element => !(element.x === player.x && element.y === player.y)); // eliminar la posición anterior del jugador
    
        player.x = newCoords.x;
        player.y = newCoords.y;
    
        this.board.elements.push({ x: newCoords.x, y: newCoords.y, type: Elements.PLAYER, state: player.state, visibility: Boolean(player.visibility) });
    }
    
}