export const ELEMENTS = {
    bush : 5,
};
export class Board {
    #board = null;
    #states = {
        NO_BUILD : 0,
        BUILD : 1
    }
    #state = null;

    constructor() {
        this.#state = this.#states.NO_BUILD;
        

    }

    build(payload) {
        const { size, elements } = payload;
        this.#board = new Array(size);
        //relleno el array con 0
        this.#board.forEach(element => element = new Array(size).fill(0));

        //cambio los 0 por X donde haya un arbusto, las coordenadas del arbusto están en el array elements
        elements.forEach(element=> this.#board[element.x][element.y]= ELEMENTS.bush);


        this.#state = this.#states.BUILD;

    }

    get board() {
        if (this.#state === this.#states.BUILD) {
            return this.#board;
        } return undefined;
    }
}