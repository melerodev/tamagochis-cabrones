export const BoardHandler = {
    rows: 0,
    colums: 0,
    shrubs: [],

    init(rows, colums, shrubs) {
        this.rows = rows;
        this.colums = colums;
        this.shrubs = shrubs;

        const container = document.querySelector(".container");
        const table = document.createElement("table");
        table.className = "tablero";
        let count = 0;
        
        for (let i = 0; i < rows; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < colums; j++) {

                const cell = document.createElement("td");
                cell.setAttribute("id", count++);

                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        container.appendChild(table); 

        for (let i = 0; i < shrubs.elements.length; i++) {
            const shrub = shrubs.elements[i];

            const coords = parseInt(shrub.x.toString() + shrub.y.toString());
            document.getElementById(coords).innerHTML = `<i class="fa-solid fa-cloud" style="color: green"></i>`;
            // document.getElementById(coords).textContent = "🌳";

        }
    },
};