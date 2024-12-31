export const Calculadora = {
    init: () => {
        const display = document.querySelector('.display'); // display de la calculadora

        let operacion = null;
        let op1 = null;
        let op2 = null;
        
        // añadir un listener para los botones
        document.querySelectorAll('.btn').forEach(boton => {
            boton.addEventListener('click', (e) => { // añadir un listener para los botones
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

                        // vaciamos las variables
                        operacion = null;
                        op1 = null;
                        op2 = null;
                        break;
                    case 'C':
                        display.textContent = ''; // vaciamos el display
                        
                        // vaciamos las variables
                        operacion = null;
                        op1 = null;
                        op2 = null;
                        break;
                    default:
                        if (operacion !== null) { // si la operación no es nula
                            display.textContent = ''; // vaciamos el display
                        }
                        display.textContent += e.target.textContent; // añadimos el número al display
                        break;
                }
            });
        });
    }
}