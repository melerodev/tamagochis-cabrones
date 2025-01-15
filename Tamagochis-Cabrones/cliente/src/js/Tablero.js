export const Tablero = {
    // ROWS: 8,
    // COLUMS: 8,
    // Shrubs: 3,
    // PLAYERS: 4
    init(rows, colums, shrubs) {
        const container = document.querySelector(".container");
        const table = document.createElement("table");
        table.className = "tablero";

        for (let i = 0; i < rows; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < colums; j++) {
                const cell = document.createElement("td");

                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        container.appendChild(table);
        
    }
};