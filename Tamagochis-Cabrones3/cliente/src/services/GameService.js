import { BoardHandler } from './BoardHandler.js';

export class GameService {
    #states = {
        WAITING : 0,
        PLAYING : 1,
        ENDED : 2
    };
    #players = [];
    #board = null;
    #state = null;
    #actionsList = {
        "PLAYER" : this.do_newPlayer,
        "START_GAME" : this.do_startGame,
        "END_GAME" : this.do_endGame,
        "DISCONNECTED" : this.do_playerDisconnected,
        "BOARD" : this.do_board,
    };
    constructor(){
        this.#state = this.#states.WAITING
    }
    do (eventRequestData) {
        const actionFunction = this.#actionsList[eventRequestData.action];
        if (this.#actionsList[eventRequestData.action]) {
            // this.#actionsList.call(this, data);
            actionFunction(eventRequestData.data);            
        } else {
            console.error("No se ha encontrado la acción: " + eventRequestData.event);
        }
    };

    do_newPlayer (data) {
        console.log(data);
    }
    do_startGame (data) {
        console.log(data);
    }
    do_endGame (data) {
        console.log(data);
    }
    do_playerDisconnected (data) {
        console.log(data);	
    }
    do_board (data) {
        BoardHandler.init(10, 10, data.content);
        console.log("Se ha creado un tablero");
    }
}