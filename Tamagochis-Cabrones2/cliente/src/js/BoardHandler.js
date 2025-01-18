export const BoardHandler = {
    rows: 0,
    colums: 0,
    shrubs: [],

    init(rows, colums, game) {
        this.rows = rows;
        this.colums = colums;
        this.shrubs = game;
        console.log(game);
        
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

        // añadir el personaje
        for (let i = 0; i < game.numberOfPlayers; i++) {
            let numberOfPlayers = game.numberOfPlayers;
            console.log(numberOfPlayers);
            switch(numberOfPlayers) {
                case 1:
                    document.getElementById(0).innerHTML = `<i class="fa-solid fa-person" style="color: red"></i>`;
                    break;
                case 2:
                    document.getElementById(0).innerHTML = `<i class="fa-solid fa-person" style="color: red"></i>`;
                    document.getElementById(9).innerHTML = `<i class="fa-solid fa-person" style="color: brown"></i>`;
                    break;
                case 3:
                    document.getElementById(0).innerHTML = `<i class="fa-solid fa-person" style="color: red"></i>`;
                    document.getElementById(9).innerHTML = `<i class="fa-solid fa-person" style="color: brown"></i>`;
                    document.getElementById(90).innerHTML = `<i class="fa-solid fa-person" style="color: purple"></i>`;
                    break;
                case 4:
                    document.getElementById(0).innerHTML = `<i class="fa-solid fa-person" style="color: red"></i>`;
                    document.getElementById(9).innerHTML = `<i class="fa-solid fa-person" style="color: brown"></i>`;
                    document.getElementById(90).innerHTML = `<i class="fa-solid fa-person" style="color: purple"></i>`; 
                    document.getElementById(99).innerHTML = `<i class="fa-solid fa-person" style="color: orange"></i>`;
                    break;
            }
        }
    },
};