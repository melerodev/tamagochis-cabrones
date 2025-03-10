export const Board = {
    init: (container) => {
        const table = document.createElement('table');
    
        table.setAttribute('border', '1');
        table.classList.add('table');

        for (let i = 0; i < 10; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < 10; j++) {
                const td = document.createElement('td');
                tr.setAttribute('data-row', i+1); // Atributo del número de la fila
                const input = document.createElement('input');
                input.setAttribute('type', 'text');
                td.appendChild(input);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        document.querySelector(container).appendChild(table);
    }
}