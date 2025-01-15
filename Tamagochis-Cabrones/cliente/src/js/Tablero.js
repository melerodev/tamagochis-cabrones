export const Tablero = {
    rows: 0,
    colums: 0,
    shrubs: 0,

    init(rows, colums, shrubs) {
        this.rows = rows;
        this.colums = colums;
        this.shrubs = shrubs;

        const container = document.querySelector(".container");
        const table = document.createElement("table");
        table.className = "tablero";
        let count = 0;
        let shrub = [];

        for (let i = 0; i < rows; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < colums; j++) {
                while(shrub.length != shrubs) {
                    let random = Math.floor(Math.random() * (rows * colums));
                    // si la posicion en la que se ha generado el arbusto es alguna esquina o el centro, se vuelve a generar
                    if (random == 0 || random == rows - 1 || random == rows * colums - 1 || random == rows * colums - rows) {
                        continue;
                    }
                    if (!shrub.includes(random)) {
                        shrub.push(random);
                    }
                }

                const cell = document.createElement("td");
                cell.setAttribute("id", count++);

                if (shrub.includes(parseInt(cell.getAttribute("id")))) {
                    cell.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
                }

                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        container.appendChild(table);
    },

    addPerson(players) {
        let posicion = null;
        let color = "";

        switch (color) {
            case players == 1:
                color = "red";
                break;
            case players == 2:
                color = "blue";
                break;
            case players == 3:
                color = "green";
                break;
            case players == 4:
                color = "yellow";
                break;
        }

        switch (position) {
            case document.getElementById("0") == null: // si la primera celda esta vacia
                posicion = 0;
                break;
            case document.getElementById(this.rows - 1) == null: // si la ultima celda de la primera fila esta vacia 
                posicion = this.rows - 1;
                break;
            case document.getElementById(this.rows * this.colums - 1) == null: // si la última celda en la esquina inferior derecha de la tabla. esta vacia
                posicion = this.rows * this.colums - 1;
                break;
            case document.getElementById(this.rows * this.colums - this.rows) == null: // si la última celda en la esquina inferior izquierda de la tabla. esta vacia
                posicion = this.rows * this.colums - this.rows;
                break;
        }

        document.querySelector(`#${posicion}`).innerHTML = `<i class="fa-solid fa-person-dash" style="color: ${color}"></i>`;
    }
};