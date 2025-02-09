import { Board } from "../entities/Board.js";
import { Queue } from "../Queue.js";
export class GameService {
    #states = {
        WAITING : 0,
        PLAYING : 1,
        ENDED : 2
    };
    #ui = null;
    #players = [];
    #board = null;
    #queue = null;
    #state = null;
    #parallel = null;

    #actionsList = {
        "NEW_PLAYER" : this.do_newPlayer.bind(this),
        "BOARD" : this.do_newBoard.bind(this),
        "DISCONECTED" : this.do_disconected.bind(this)
    };

    constructor(ui){
        this.#state = this.#states.WAITING;
        this.#board = new Board();
        this.#queue = new Queue();
        this.#parallel = null;
        this.checkScheduler();
        this.#ui = ui;
    }

    checkScheduler() {
        if (!this.#queue.isEmpty()) {
            if (this.#parallel == null) {
                this.#parallel = setInterval(
                    async ()=>{
                        const action = this.#queue.getMessage();
                        if (action != undefined) {
                            await this.#actionsList[action.type] (action.content);
                        } else {
                            this.stopScheduler();
                        }
                    }
                );
            }
        }
    }

    stopScheduler() {
        clearInterval(this.#parallel);
        this.#parallel = null;
    }

    do (data) {
        this.#queue.addMessage(data);
        this.checkScheduler();
    };

    async do_newPlayer (payload) {
        this.#players.push(payload);
        this.#ui.sendNotification("Un nuevo jugador se ha unido a la partida 🎮", false);
    };

    async do_newBoard(payload) {
        this.#state = this.#states.PLAYING;
        this.#board.build(payload);
        this.#ui.drawBoard(this.#board.map);
        console.log(this.#board);
    }

    async do_disconected(payload) {
        this.#state = this.#states.WAITING;
        this.#players.splice(this.#players.findIndex((player) => player.id == payload)); // el método splice elimina un elemento de un array

        this.#ui.sendNotification("Un nuevo jugador se ha salido de la partida  🚪", true);
    }
}

document.addEventListener("keydown", function(event) {
    console.log(event.key);
});