import { InputMapper } from "./mapper/InputMapper.js";

export class Validador {
    #operations = {
        "euro": this.#euroAddEvents,
        "date": this.#dateAddEvents
    }

    constructor() {
        [...document.forms].forEach((item) => {
            InputMapper(item.elements).forEach( (item)=> {
                this.#operations[item.type](item);        
            });   
        })
    }

    #euroAddEvents(item) {
        item.object.addEventListener('input', (event) => {
            this.validarCampos(event, "euro");
        });
    }

    #dateAddEvents(item) {
        item.object.addEventListener('input', (event) => {
            this.validarCampos(event, "date");
        });
    }

    validarCampos(event, tipo) {
        value = evento.target.value;
        switch (tipo) {
            case "euro":
                if (isNaN(value)) {
                    event.target.style.border = "1px solid red";
                } else {
                    event.target.style.border = "";
                }
            case "date":
                if (new Date(value).getTime() < Date.now()) {
                    event.target.style.border = "1px solid red";
                } else {
                    event.target.style.border = "";
                }
            }
    }
}