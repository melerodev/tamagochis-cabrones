export const ELEMENTS = {
    bush: 5,
};

export class Board {
    #board = null;
    #states = {
        NO_BUILD: 0,
        BUILD: 1
    }
    #state = null;

    constructor() {
        this.#state = this.#states.NO_BUILD;
    }

    build(payload) {
        const { size, elements } = payload;

        this.#board = new Array(size);

        // Relleno el array con arrays de 0
        for (let i = 0; i < size; i++) {
            this.#board[i] = new Array(size).fill(0);
        }

        // Cambio los 0 por X donde haya un arbusto, las coordenadas del arbusto están en el array elements
        elements.forEach(element => this.#board[element.x][element.y] = ELEMENTS.bush);
        this.#state = this.#states.BUILD;
    }

    get getBoard() {
        return this.#board;
    }
}