import { Board } from "../entities/Board.js";
export class GameService {
    #states = {
        WAITING : 0,
        PLAYING : 1,
        ENDED : 2
    };
    
    #ui = null;
    #players = [];
    #board = null;
    #state = null;

    #actionsList = {
        "PLAYER" : this.do_newPlayer.bind(this),
        "START_GAME" : this.do_startGame.bind(this),
        "END_GAME" : this.do_endGame.bind(this),
        "DISCONNECTED" : this.do_playerDisconnected.bind(this),
        "BOARD" : this.do_newBoard.bind(this),
    };
    
    constructor(){
        this.#state = this.#states.WAITING;
        this.#board = new Board();
    }

    set uiSetter(ui){
        this.#ui = ui;
    }

    get uiGetter(){
        return this.#ui;
    }

    do (eventRequestData) {
        const actionFunction = this.#actionsList[eventRequestData.action];
        console.log("La UI es : " + this.#ui);
        if (this.#actionsList[eventRequestData.action]) {
            actionFunction(eventRequestData.data);
        } else {
            console.error("No se ha encontrado la acción: " + eventRequestData.action);
        }
    };

    do_startGame(payload) {
        console.log("El juego ha empezado");
    }

    do_endGame(payload) {
        console.log("El juego ha terminado");
    }

    do_playerDisconnected(payload) {
        console.log("Un jugador se ha desconectado");
    }

    do_newPlayer (payload) {
        console.log("ha llegado un jugador nuevo");
    };

    do_newBoard(payload) {
        this.#board.build(payload.content);
        this.#ui.drawBoard(this.#board.getBoard);
    }
}

