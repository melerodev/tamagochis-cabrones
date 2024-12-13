import { Cliente } from './index.js'; // para ahorra código, importo la función send de index.js para enviar los datos al servidor desde el mismo sitio donde estoy manejando eventos con check

export class Check {
    constructor(parent,client) {
        this.parent = parent;
        this.client = client;
        this.states = [];
    }

    changeValue(name, value) {
        const data = this.states.find((item) => item.name == name); // 
        data.state = value;
    }

    // le añado una id a cada check para poder identificarlo y luego enviarlo al servidor y que este sepa cuál check se activó o desactivó
    addCheck(name, num) {
        this.states.push({
            name : name,
            state : false
        })
        const check = document.createElement("label");
        check.classList.add("form-switch");
        this.parent.appendChild(check);
        const input = document.createElement("input");
        input.setAttribute('type', 'checkbox');
        check.appendChild(input);
        check.appendChild(document.createElement("i"));
        const span = document.createElement('span');
        const text = document.createTextNode('OFF');
        check.setAttribute('id', num) // añadirle una id al label
        span.appendChild(text);
        check.appendChild(span);
        input.addEventListener('change', (event) => { // cuando cambie el check se ejecutará la función flecha
            this.changeValue(name, event.target.checked); // cambio el valor del check
            const span = event.target.parentElement.querySelector('span'); // obtengo el span del check
            span.innerHTML = event.target.checked ? 'ON' : 'OFF'; // si el check está activado, el texto será ON, si no, será OFF
            Cliente.send({name: event.target.closest(".form-switch").id, state: event.target.checked}); // envío el id del label y el estado del check al servidor
            // con "event.target.closest(".form-switch").id" obtengo el elemento más cercano que tenga el elemento I y luego obtengo su id
        })
    }
}