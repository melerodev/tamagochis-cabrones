/*
    Ejercicio 1, versión 2
    -----------------------
    En esta versión lo que hago es hacer una expresión regular para comprobar que el DNI tenga 8 dígitos y una letra al final,
    esto antes era comprobando el la longitud del campo 'input', pero puede llegar a fallar a la hora parsear los primeros 8 dígitos 
    del DNI si ingreso una letra al dentro de este rango. Y he añadido un <span> en el HTML para mostrar un mensaje de error.
*/

var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
const input = document.querySelector('input');

input.addEventListener('input', () => {
    const dni = input.value; 
    const dniLetra = dni.slice(-1).toUpperCase(); // el método slice(-1) nos devuelve el último caracter
    const resultado = document.getElementById('resultado');

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
    }
});