/* 
    Ejercicio 3, versión 2
    -----------------------
    En esta versión lo que se hace es separar la lógica de la calculadora en un archivo aparte, para que el index.js solo se encargue de inicializar la calculadora.
*/

import { Calculadora } from './CalculadoraHandler.js'; // importar el objeto Calculadora del archivo CalculadoraHandler.js

Calculadora.init(); // inicializar la calculadora