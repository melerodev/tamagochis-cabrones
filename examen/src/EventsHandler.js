export const EventsHandler = {
    init: () => {
        let suma = [];
        
        const inputs = document.querySelectorAll('input');

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
                    if (!isNaN(value)) { // isNan lo que hace es comprobar si el valor es un número
                        sum += value;
                    }
                });

                suma = suma.filter(s => s.fila !== tr.getAttribute('data-row')); // si el array contiene el número de la fila, lo borra
                suma.push({fila: tr.getAttribute('data-row'), suma: sum});
                console.log(suma);
            });
        });
    }
}