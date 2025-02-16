import { Directions, Player, PlayerStates } from "../player/entities/Player";
import { Board } from "./entities/Board";
import { Keys, MoveResult, RotateResult, ShotResult } from "./entities/Game";

export enum Elements {
    BUSH = 5,
    PLAYER = 1,
    EMPTY = 0
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

export class BoardBuilder {
    private board: Board;
    
    constructor() {
        this.board = {
            size: 10,
            elements: [],
        }

        for(let i = 0; i < this.board.size; i++)
            for(let j = 0; j < this.board.size; j++)
                if(map[i][j] != Elements.EMPTY) {
                    this.board.elements.push({id: null, x : i, y : j, type : Elements.BUSH, direction: null, state: null, visibility: null});
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


        this.board.elements.push({id: player.id.id, x : corners[coords].x, y : corners[coords].y, type : Elements.PLAYER, direction: player.direction, state: player.state, visibility: Boolean(player.visibility)});

        console.log(`He añadido un jugador ${player.name} en la posición (${player.x}, ${player.y})`);
    }

    public removePlayerFromBoard(player: Player | undefined) {
        if (!player) return;
        
        this.board.elements = this.board.elements.filter(element => !(element.x === player.x && element.y === player.y));
        
        console.log(`He eliminado un jugador ${player.id.id} en la posición (${player.x}, ${player.y})`);
    }

    public movePlayer(player: Player, key: Keys) : MoveResult | null {
        var result : MoveResult | null = {id: "0", x: 0, y: 0, visibility: true, direction: Directions.Idle, state: PlayerStates.Idle };
        let newCoords = { x: Number(player.x), y: Number(player.y) };
        let lastPlayerCoords = { x: Number(player.x), y: Number(player.y) };

        if ((key === Keys.ArrowUp && player.direction !== Directions.Up) || // si el jugador intenta moverse en una dirección no permitida
        (key === Keys.ArrowDown && player.direction !== Directions.Down) ||
        (key === Keys.ArrowLeft && player.direction !== Directions.Left) ||
        (key === Keys.ArrowRight && player.direction !== Directions.Right)) 
        {
            return null;
        }

        switch (key) { // obtener las nuevas coordenadas del jugador
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
                return null;
        }

        if (newCoords.x < 0 || newCoords.y < 0 || newCoords.x >= this.board.size || newCoords.y >= this.board.size) { // si el jugador se sale del tablero
            return null;
        }
    
        const elementAtNewPos = this.board.elements.find(element => element.x === newCoords.x && element.y === newCoords.y); // obtener el elemento en la nueva posición
        
        if (elementAtNewPos) { // si hay un elemento en la nueva posición
            if (elementAtNewPos.type == Elements.BUSH) { // si el elemento es un arbusto
                player.visibility = false;
            } 
            
            if (elementAtNewPos.type == Elements.PLAYER) { // si el elemento es un jugador
                return null;
            }
        }

        this.board.elements = this.board.elements.filter(element => !(element.x === player.x && element.y === player.y)); // eliminar la posición anterior del jugador

        // actualizar las coordenadas del jugador
        player.x = newCoords.x;
        player.y = newCoords.y;

        if (player.visibility == false && map[lastPlayerCoords.x][lastPlayerCoords.y] == Elements.BUSH) { // si el jugador estaba en un arbusto
            player.visibility = true; // hacerlo visible
            this.board.elements.push({id: null, x : lastPlayerCoords.x, y : lastPlayerCoords.y, type : Elements.BUSH, direction: player.direction, state: null, visibility: null}); // añadir el arbusto a la posición anterior del jugador
        }

        this.board.elements.push({id: player.id.id, x: newCoords.x, y: newCoords.y, type: Elements.PLAYER, direction: player.direction, state: player.state, visibility: Boolean(player.visibility) }); // añadir la nueva posición del jugador
        result = {id: player.id.id, x: newCoords.x, y: newCoords.y, visibility: Boolean(player.visibility), direction: player.direction, state: player.state }; // asignar el resultado

        console.log(`El jugador ${player.name} se ha movido a la posición (${player.x}, ${player.y})`);

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

    public firePlayer(player: Player) : ShotResult | null {
        var result : ShotResult | null = { id: "0" };
        let newCoords = { x: Number(player.x), y: Number(player.y) };

        switch (player.direction) { // obtener las nuevas coordenadas del jugador
            case Directions.Up:
                newCoords.x--;
                break;
            case Directions.Down:
                newCoords.x++;
                break;
            case Directions.Left:
                newCoords.y--;
                break;
            case Directions.Right:
                newCoords.y++;
                break;
            default:
                console.log("No se ha podido disparar");
                return null;
        }

        const elementAtNewPos = this.board.elements.find(element => element.x === newCoords.x && element.y === newCoords.y); // obtener el elemento en la nueva posición

        if (elementAtNewPos) {
            if (elementAtNewPos?.type == Elements.PLAYER && elementAtNewPos.visibility == true && player.direction != elementAtNewPos.direction) { // si hay un jugador en la nueva posición, es visible y no está mirando hacia el mismo lado
                elementAtNewPos.state = PlayerStates.Dead;
                this.board.elements = this.board.elements.filter(element => !(element.x === newCoords.x && element.y === newCoords.y));
                result = { id: elementAtNewPos.id ?? "0" };
            } else {
                return null;
            }
        } else {
            return null;
        }
        
        return result;
    }
}