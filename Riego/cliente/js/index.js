import { Check } from './check.js';

export const Cliente = {
    send: (data)=>{
        fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log('Ítem creado:', data);
            })
            .catch(error => {
              console.error('Error al crear el ítem:', error);
            });
          
    }
}

// cuando se cargue la página se obtengan los datos del servidor
window.addEventListener('load', (event) => {
  fetch('http://localhost:3000/api/items', { // obtengo los datos del servidor
    method: 'GET', // le digo al servidor que quiero obtener los datos
    headers: {
      'Content-Type': 'application/json' // le digo al servidor que quiero los datos en formato JSON
    }
  })
  .then(response => response.json()) // convierto los datos en JSON
  .then(data => { // obtengo los datos
    data.forEach(item => { // recorro los datos
      const check = document.getElementById(item.name); // obtengo el check por su id
      check.querySelector('input').checked = item.state; // cambio el estado del check
      check.querySelector('span').innerHTML = item.state ? 'ON' : 'OFF'; // cambio el texto del check
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

const check1 = new Check(document.getElementById("grupo1"),Cliente);
check1.addCheck("riego1", 1);
check1.addCheck("riego2", 2);

const check2 = new Check(document.getElementById("grupo2"),Cliente);
check2.addCheck("riego1", 3);
check2.addCheck("riego2", 4);

const check3 = new Check(document.getElementById("grupo3"),Cliente);
check3.addCheck("riego1", 5);
check3.addCheck("riego2", 6);

const check4 = new Check(document.getElementById("grupo4"),Cliente);
check4.addCheck("riego1", 7);
check4.addCheck("riego2", 8);