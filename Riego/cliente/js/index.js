import { Check } from './check.js';

const Cliente = {
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

// cuando se cambiel el valor de un checkbox se obtenga el target el evento y se cambie el valor del span
document.addEventListener('change', (event) => {
  const span = event.target.parentElement.querySelector('span');
  span.innerHTML = event.target.checked ? 'ON' : 'OFF';
  Cliente.send({name: event.target.parentElement.parentElement.id, state: event.target.checked});
});

// cuando se cargue la página se obtengan los datos del servidor
window.addEventListener('load', (event) => {
  fetch('http://localhost:3000/api/items', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const check = document.getElementById(item.name);
      console.log(check);
      check.querySelector('input').checked = item.state;
      check.querySelector('span').innerHTML = item.state ? 'ON' : 'OFF';
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

const check1 = new Check(document.getElementById("grupo1"),Cliente);
check1.addCheck("riego1");
check1.addCheck("riego2");

const check2 = new Check(document.getElementById("grupo2"),Cliente);
check2.addCheck("riego1");
check2.addCheck("riego2");

const check3 = new Check(document.getElementById("grupo3"),Cliente);
check3.addCheck("riego1");
check3.addCheck("riego2");