import { Directions, Player, PlayerStates } from "../player/entities/Player";
import { Board } from "./entities/Board";
import { Keys, MoveResult, RotateResult } from "./entities/Game";

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
                    this.board.elements.push({id: null, x : i, y : j, type : Elements.BUSH, state: null, visibility: null});
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


        this.board.elements.push({id: player.id.id, x : corners[coords].x, y : corners[coords].y, type : Elements.PLAYER, state: player.state, visibility: Boolean(player.visibility)});

        console.log(`He añadido un jugador ${player.name} en la posición (${player.x}, ${player.y})`);
    }

    public removePlayerFromBoard(player: Player | undefined) {
        if (!player) return;
        
        this.board.elements = this.board.elements.filter(element => !(element.x === player.x && element.y === player.y));
        
        console.log(`He eliminado un jugador ${player.id.id} en la posición (${player.x}, ${player.y})`);
    }

    public movePlayer(player: Player, key: Keys) : MoveResult | null {
        var result : MoveResult | null = {id: "0", x: 0, y: 0, visibility: true, direction: Directions.Idle, state: PlayerStates.Idle };
        var allowed : boolean = true;

        const newCoords = { x: Number(player.x), y: Number(player.y) };
        switch (key) {
            case Keys.ArrowUp:
                newCoords.x--;
                break;
            case Keys.ArrowDown:
                newCoords.x++;
                break;
            case Keys.ArrowLeft:
                newCoords.y--;
                break;
            case Keys.ArrowRight:
                newCoords.y++;
                break;
            default:
                console.log("Dirección no válida");
                allowed = false;
                result = null;
        }
    
        if (newCoords.x < 0 || newCoords.y < 0 || newCoords.x >= this.board.size || newCoords.y >= this.board.size) {
            console.log(`El jugador ${player.name} quiere salir fuera de los límites del tablero.`);
            allowed = false;
            result = null;
        }
    
        const elementAtNewPos = this.board.elements.find(element => element.x === newCoords.x && element.y === newCoords.y);

        console.log(elementAtNewPos?.type)
        
        if (elementAtNewPos && elementAtNewPos.type === Elements.BUSH) {
            player.visibility = false;
            console.log(`El jugador ${player.name} ha entrado en un arbusto.`);
        } else {
            player.visibility = true;
        }

        if (elementAtNewPos && elementAtNewPos.type === Elements.PLAYER) {
            allowed = false;
            result = null;
        }
    
        this.board.elements = this.board.elements.filter(element => !(element.x === player.x && element.y === player.y)); // eliminar la posición anterior del jugador

        if (allowed) {
            player.x = newCoords.x;
            player.y = newCoords.y;

            this.board.elements.push({id: player.id.id, x: newCoords.x, y: newCoords.y, type: Elements.PLAYER, state: player.state, visibility: Boolean(player.visibility) });
            result = {id: player.id.id, x: newCoords.x, y: newCoords.y, visibility: Boolean(player.visibility), direction: player.direction, state: player.state };
        }
        console.log(`He movido al jugador ${player.name} a la posición (${player.x}, ${player.y})`);

        return result;
    }

    public rotatePlayer(player: Player) : RotateResult {
        switch(player.direction) {
            case Directions.Up:
                player.direction = Directions.Right;
                break;
            case Directions.Right:
                player.direction = Directions.Down;
                break;
            case Directions.Down:
                player.direction = Directions.Left;
                break;
            case Directions.Left:
                player.direction = Directions.Up;
                break;
            default:
                console.log("Dirección no válida");
        }

        return { id: player.id.id, direction: player.direction };
    }

    public firePlayer(player: Player) : Boolean {
        var result = true;

        return result;
    }
}