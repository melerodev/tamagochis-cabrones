import {UI} from "./Ui.js";

export const UIv1 = UI;

UIv1.drawBoard = (shrubs)=>{
    const container = document.querySelector(".container");
    const table = document.createElement("table");

    shrubs.forEach(row => {
        const tr = document.createElement("tr");

        row.forEach(cell => {
            const td = document.createElement("td");
            if (cell === 5) {
                const iElement = document.createElement("i");
                iElement.className = "fa-solid fa-cloud";
                iElement.style.color = "green";
                td.appendChild(iElement);
            }
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });

    container.appendChild(table);
}
