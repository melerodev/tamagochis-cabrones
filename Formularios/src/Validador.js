import { InputMapper } from "./mapper/InputMapper.js"
import { Config } from "./config/Config.js"
import { Factory } from "../../Validar-Campos/assets/js/factory/factory.js"; // Importar Factory

export class Validador {
    #operations = {
        "euro": this.#euroAddEvents,
        "date": this.#dateAddEvents
    }

    constructor() {
        [...document.forms].forEach((item) => {
            InputMapper(item.elements).forEach( (item)=> {
                this.#operations[item.type].call(this, item);        
            });   
        })
    }

    #euroAddEvents(item) {
        const button = document.querySelector('input[type="submit"]');
        item.object.addEventListener('input', (event) => {
            Factory.euro(event, button);
            this.#validateFields(); // Verifica los campos en cada entrada
        });
    }

    #dateAddEvents(item) {
        const button = document.querySelector('input[type="submit"]');
        item.object.addEventListener('input', (event) => {
            Factory.fecha(event, button);
            this.#validateFields(); // Verifica los campos en cada entrada
        });
    }

    #validateFields() {
        const button = document.querySelector('input[type="submit"]');
        const euroInput = document.querySelector('.euro');
        const dateInput = document.querySelector('.date');

        if (!euroInput.value.trim() || !dateInput.value.trim()) {
            button.disabled = true; // Deshabilita el botón si algún campo está vacío
        } else {
            button.disabled = false; // Habilita el botón si ambos campos tienen valor
        }
    }
}