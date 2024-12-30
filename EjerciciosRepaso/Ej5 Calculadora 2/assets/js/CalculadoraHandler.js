export const Calculadora = {
    init: () => {
        const display = document.querySelector('.display');

        let historial = [];
        let historialStatus = false;

        let operacion = null;
        let op1 = null;
        let op2 = null;

        document.querySelectorAll('.btn').forEach(boton => {
            boton.addEventListener('click', (e) => {
                switch (e.target.textContent) {
                    case '+':
                        operacion = '+';
                        op1 = parseInt(display.textContent);
                        break;
                    case '-':
                        operacion = '-';
                        op1 = parseInt(display.textContent);
                        break;
                    case '=':
                        op2 = parseInt(display.textContent);
                        display.textContent = operacion === '+' ? op1 + op2 : op1 - op2;

                        // añadimos la operación al historial
                        let elemento = document.createElement('div');
                        elemento.classList.add('historial__item');

                        if (operacion !== null && op1 !== null && op2 !== null) {
                            document.querySelector('.historial_vacio').style.display = 'none';
                            let operacionHistorial = `${op1} ${operacion} ${op2} = ${display.textContent}`;
                            elemento.innerHTML = `<span>${operacionHistorial}</span> <button class="btn_delete">Eliminar</button>`;
                            elemento.setAttribute('id', historial.length);
                            // añadimos el elemento al historial
                            document.querySelector('.historial__list').appendChild(elemento);

                            // añadir un listenear para añadir el resultado de la operacion al display
                            elemento.addEventListener('click', (e) => {
                                display.textContent = e.target.textContent.split('=')[1].trim();
                            });

                            // añadimos la operación al array
                            historial.push({ id: historial.length, resultado: display.textContent });
                            console.log(historial);

                            document.querySelectorAll('.btn_delete').forEach(btn => {
                                btn.addEventListener('click', (e) => {
                                    // borrar el elemento del historial
                                    historial = historial.filter(item => item.id !== parseInt(e.target.parentElement.id));
                                    console.log(historial);
                                    e.target.parentElement.remove();
                                    if (historial.length === 0) {
                                        document.querySelector('.historial_vacio').style.display = 'block';
                                    }
                                });
                            });
                        }

                        operacion = null;
                        op1 = null;
                        op2 = null;
                        break;
                    case 'C':
                        display.textContent = '';
                        operacion = null;
                        op1 = null;
                        op2 = null;
                        break;
                    default:
                        if (operacion !== null) {
                            display.textContent = '';
                        }
                        display.textContent += e.target.textContent;
                        break;
                }
            });
        });

        document.querySelector('.fa-clock-rotate-left').parentElement.addEventListener('click', () => {
            historialStatus = !historialStatus;
            document.querySelector('.historial').style.display = historialStatus ? 'block' : 'none';
        });
    }
}