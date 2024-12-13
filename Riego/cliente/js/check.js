import { Cliente } from './index.js';
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
        // añadirle una id al check
        check.setAttribute('id', num)
        span.appendChild(text);
        check.appendChild(span);
        input.addEventListener('change', (event)=> {
            this.changeValue(name, event.target.checked);
            const span = event.target.parentElement.querySelector('span');
            span.innerHTML = event.target.checked ? 'ON' : 'OFF';
            Cliente.send({name: event.target.closest(".form-switch").id, state: event.target.checked});
            // con "event.target.closest(".form-switch").id" obtengo el elemento más cercano que tenga el I y luego obtengo su id
        })
    }
}