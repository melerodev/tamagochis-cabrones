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
        "NEW_PLAYER" : this.do_newPlayer,
        "START_GAME" : this.do_startGame,
        "END_GAME" : this.do_endGame,
        "PLAYER_DISCONNECTED" : this.do_playerDisconnected,
        "connectionStatus" : this.do_connectionStatus,
    };
    constructor(){
        this.#state = this.#states.WAITING
    }
    do (data) {
        const actionFunction = this.#actionsList[data];
        if (this.#actionsList[data]) {
            this.#actionsList.call(this, data);
            // ejercutar la función
            
        } else {
            console.error("No se ha encontrado la acción: " + data);
        }
    };
    do_newPlayer (content) {
        console.log("Ha llegado un jugador nuevo");
    };
    do_startGame (content) {
        console.log("El juego ha comenzado");
    }
    do_endGame (content) {
        console.log("El juego ha terminado");
    };
    do_playerDisconnected (content) {
        console.log("Un jugador se ha desconectado");
    }
    do_connectionStatus (content) {
        console.log("El estado de la conexión es: " + content);
    }
}