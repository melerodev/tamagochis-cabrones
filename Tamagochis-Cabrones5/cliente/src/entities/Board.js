export const ELEMENTS = {
    bush : 5,
    player: 1
};

export class Board {
    #map = null;
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
        this.#map = new Array(size).fill().map(() => new Array(size).fill(0));
        elements.forEach(element => this.#map[element.x][element.y] = ELEMENTS.bush);
        this.#state = this.#states.BUILD;
        console.log(this.#map);
    }

    get map() {
        if (this.#state === this.#states.BUILD) {
            return this.#map;
        }
        return undefined;
    }

    addPlayer(players) {
        players.forEach(player => {
            const corners = [{x: 0, y: 0}, {x: 0, y: this.#map.length - 1}, {x: this.#map.length - 1, y: 0}, {x: this.#map.length - 1, y: this.#map.length - 1}];
            var occupied = true
            var coords = null;
            
            while (occupied) {
                coords = corners[Math.floor(Math.random() * corners.length)];
                if (this.#map[coords.x][coords.y] === 0) {
                    occupied = false;
                }
            }

            this.#map[coords.x][coords.y] = ELEMENTS.player;
        });
    }
}