export const Calculadora = {
    init: () => {
        const display = document.querySelector('.display'); // display de la calculadora

        let historial = [];
        let historialStatus = false;

        let operacion = null;
        let op1 = null;
        let op2 = null;

        document.querySelectorAll('.btn').forEach(boton => {
            boton.addEventListener('click', (e) => {
                switch (e.target.textContent) {
                    case '+':
                        operacion = '+'; // guardamos la operación
                        op1 = parseInt(display.textContent); // guardamos el primer operando
                        break;
                    case '-':
                        operacion = '-'; // guardamos la operación
                        op1 = parseInt(display.textContent); // guardamos el primer operando
                        break;
                    case '=':
                        op2 = parseInt(display.textContent); // guardamos el segundo operando
                        display.textContent = operacion === '+' ? op1 + op2 : op1 - op2; // realizamos la operación

                        // añadimos la operación al historial
                        let elemento = document.createElement('div'); // creamos un elemento div
                        elemento.classList.add('historial__item'); // añadimos la clase historial__item

                        if (operacion !== null && op1 !== null && op2 !== null) { // si la operación y los operandos no son nulos
                            document.querySelector('.historial_vacio').style.display = 'none'; // ocultamos el mensaje de historial vacío
                            let operacionHistorial = `${op1} ${operacion} ${op2} = ${display.textContent}`; // guardamos la operación en una variable
                            elemento.innerHTML = `<span>${operacionHistorial}</span> <button class="btn_delete">Eliminar</button>`; // añadimos el contenido al elemento
                            elemento.setAttribute('id', historial.length); // añadimos un id al elemento
                            
                            // añadimos el elemento al historial
                            document.querySelector('.historial__list').appendChild(elemento);

                            // añadir un listenear para añadir el resultado de la operacion al display
                            elemento.addEventListener('click', (e) => {
                                display.textContent = e.target.textContent.split('=')[1].trim(); // añadimos el resultado de la operación al display
                            });

                            // añadimos la operación al array
                            historial.push({ id: historial.length, resultado: display.textContent }); // añadimos la operación al historial
                            console.log(historial); // mostramos el historial en la consola

                            // añadir un listener para borrar el elemento del historial
                            document.querySelectorAll('.btn_delete').forEach(btn => {
                                btn.addEventListener('click', (e) => { // añadir un listener para borrar el elemento del historial
                                    // borrar el elemento del historial
                                    historial = historial.filter(item => item.id !== parseInt(e.target.parentElement.id)); // filtramos el historial
                                    console.log(historial); // mostramos el historial en la consola
                                    e.target.parentElement.remove(); // eliminamos el elemento del historial
                                    if (historial.length === 0) { // si el historial está vacío
                                        document.querySelector('.historial_vacio').style.display = 'block'; // mostramos el mensaje de historial vacío
                                    }
                                });
                            });
                        }

                        // reseteamos las variables
                        operacion = null;
                        op1 = null;
                        op2 = null;
                        break;
                    case 'C':
                        display.textContent = ''; // limpiamos el display
                        operacion = null; // reseteamos la operación
                        op1 = null; // reseteamos el primer operando
                        op2 = null; // reseteamos el segundo operando
                        break;
                    default:
                        if (operacion !== null) { // si la operación no es nula
                            display.textContent = ''; // limpiamos el display
                        }
                        display.textContent += e.target.textContent; // añadimos el número al display
                        break;
                }
            });
        });

        // añadir un listener para mostrar/ocultar el historial
        document.querySelector('.fa-clock-rotate-left').parentElement.addEventListener('click', () => {
            historialStatus = !historialStatus; // cambiar el estado del historial
            document.querySelector('.historial').style.display = historialStatus ? 'block' : 'none'; // mostrar/ocultar el historial
        });
    }
}