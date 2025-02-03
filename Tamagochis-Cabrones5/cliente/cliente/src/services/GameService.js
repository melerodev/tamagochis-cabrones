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
    board = null;
    #queue = null;
    #state = null;
    #parallel = null;
    #actionsList = {
        "NEW_PLAYER" : this.do_newPlayer,
        "BOARD" : this.do_newBoard
    };
    constructor(){

        this.#state = this.#states.WAITING;
        console.log('Se ejecuta el constructor')
        this.board = new Board()
        console.log(this.board);
        this.#queue = new Queue();
        this.#parallel = setInterval(async() => {
            let termino = true;
            while(true){
                termino = false;
              const a = this.#queue.getMessage();
              console.log('A contiene');
              console.log(a);
               if(a != undefined){
                    console.log('Acabo de sacar');
                    console.log(a);
               }
            }
        }, 10000);
        console.log('Ya he terminado el constructor')

        //this.#parallel(this.#queue);
    }
    set uiSetter(ui){
        this.#ui = ui;
    }
    do (data) {
        this.#queue.addMessage(data);
        console.log('Entra en la cola');
        console.log(data);
        //this.#actionsList[data.type] (data.content)
    };
    do_newPlayer (payload) {
        console.log("ha llegado un jugador nuevo");
    };

    do_newBoard(payload) {
        console.log('Aqui va #board');
        console.log(this.board);
        this.board.build(payload);
        this.#ui.drawBoard(payload);
        
    }
    
}