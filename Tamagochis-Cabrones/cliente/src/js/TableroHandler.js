export const TableroHandler = {
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
                    // si la position en la que se ha generado el arbusto es alguna esquina o el centro, se vuelve a generar
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

    addPlayerFromTablero(playersCount, playerID) {
        let position = null;
        let color = "";

        switch (playersCount) {
            case 1:
                color = "red";
                break;
            case 2:
                color = "blue";
                break;
            case 3:
                color = "green";
                break;
            case 4:
                color = "yellow";
                break;
        }

        switch (true) {
            case (document.getElementById(0).children.length === 0): // si la primera celda esta vacia
                position = 0;
                break;
            case (document.getElementById(this.rows - 1).children.length === 0): // si la ultima celda de la primera fila esta vacia
                position = this.rows - 1;
                break;
            case (document.getElementById(this.rows * this.colums - 1).children.length === 0): // si la última celda en la esquina inferior derecha de la tabla. esta vacia
                position = this.rows * this.colums - 1;
                break;
            case (document.getElementById(this.rows * this.colums - this.rows).children.length === 0): // si la última celda en la esquina inferior izquierda de la tabla. esta vacia
                position = this.rows * this.colums - this.rows;
                break;
        }

        console.log(position);
        console.log(document.getElementById(0).children.length === 0)

        document.getElementById(position).innerHTML = `<i id=${playerID} class="fa-solid fa-user" style="color: ${color}"></i>`;    
    },

    removePlayerFromTablero(playerID) {
        
    }
};