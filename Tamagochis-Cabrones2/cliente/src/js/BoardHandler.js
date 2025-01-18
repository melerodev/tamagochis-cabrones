export const BoardHandler = {
    rows: 0,
    colums: 0,
    shrubs: [],

    init(rows, colums, game) {
        this.rows = rows;
        this.colums = colums;
        this.shrubs = game;
        
        const container = document.querySelector(".container");
        const table = document.createElement("table");
        table.className = "tablero";
        let count = 0;
        
        // crear los TR y TD y asignarles un ID
        for (let i = 0; i < rows; i++) {
            const row = document.createElement("tr"); //  se crea el TR

            for (let j = 0; j < colums; j++) { // se crean los TD
                const cell = document.createElement("td"); // se crea el TD
                cell.setAttribute("id", count++); // se le asigna un ID

                row.appendChild(cell); // se añade el TD al TR
            }
            table.appendChild(row); // se añade el TR a la tabla
        }

        container.appendChild(table); // se añade la tabla al contenedor

        // añadir los arbustos
        for (let i = 0; i < game.board.elements.length; i++) {
            const shrub = game.board.elements[i]; // se obtiene el arbusto

            const coords = parseInt(shrub.x.toString() + shrub.y.toString());
            document.getElementById(coords).innerHTML = `<i class="fa-solid fa-cloud" style="color: green"></i>`;
            // document.getElementById(coords).textContent = "🌳";
        }
    },
};