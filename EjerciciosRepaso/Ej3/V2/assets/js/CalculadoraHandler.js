export const Calculadora = {
    init: () => {
        const display = document.querySelector('.display');

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
    }
}