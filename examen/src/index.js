const container = document.querySelector('.container');

const table = document.createElement('table');

table.setAttribute('border', '1');
table.classList.add('table');

let suma = [];

for (let i = 0; i < 10; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 10; j++) {
        const td = document.createElement('td');
        tr.setAttribute('data-row', i+1); // Atributo del número de la fila
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.classList.add('input');
        td.appendChild(input);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

container.appendChild(table);

const inputs = document.querySelectorAll('.input');
inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        if (isNaN(e.target.value)) { // si no es un número lo pone a 0
            e.target.value = 0;
        }
    });
});

inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const tr = e.target.parentElement.parentElement;
        const tds = tr.querySelectorAll('td');
        let sum = 0;
        tds.forEach(td => {
            const value = parseInt(td.querySelector('input').value);
            if (!isNaN(value)) {
                sum += value;
            }
        });
        
        suma = suma.filter(s => s.fila !== tr.getAttribute('data-row')); // si el array contiene el número de la fila, lo borra
        suma.push({fila: tr.getAttribute('data-row'), suma: sum});
        console.log(suma);
    });
});
