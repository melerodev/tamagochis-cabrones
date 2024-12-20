/*
    Ejercicio 1, versión 3
    -----------------------
    En esta versión lo que hago es encapsular el código en un objeto, de esta manera puedo reutilizarlo en otros proyectos 
*/

var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

const ValidarDNI = {
    init: (campoInput, campoResultado) => {
        const input = document.querySelector(campoInput);
        input.addEventListener('input', () => {
            const dni = input.value; 
            const dniLetra = dni.slice(-1).toUpperCase(); // el método slice(-1) nos devuelve el último caracter
            const resultado = document.getElementById(campoResultado);
        
            if (dni.match(/^\d{8}[A-Z]$/)) { // comprobamos que el DNI tenga 8 dígitos y una letra al final
                let lettraCorrecta = letras[parseInt(dni.slice(0, 8)) % 23]; // calculamos la letra
        
                if (lettraCorrecta === dniLetra) {
                    input.style.backgroundColor = 'green';
                    if (resultado.querySelector('span')) {
                        resultado.querySelector('span').remove();
                    }
                } else {
                    input.style.backgroundColor = 'red';
                    resultado.innerHTML = "<span style='color: red;'>El DNI no es correcto</span>";
                }
            } else {
                input.style.backgroundColor = 'red';
                resultado.innerHTML = "<span style='color: red;'>El DNI no es correcto</span>";
            }});
    }
}

ValidarDNI.init('input', 'resultado');