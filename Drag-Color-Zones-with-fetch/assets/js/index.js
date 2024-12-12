import { setupDraggables } from "./uiDrag.js";
import { generateCards } from "./letterGenerator.js";
import { adjustDropzoneSize, resetDropzoneSize } from "./uiDrag.js";

// generar cartas y dividirlas en dos grupos
window.addEventListener("load", () => {
  const dropzones = document.querySelectorAll(".dropzone");

  const colors = {
    "dropzone1": "#3498db",
    "dropzone2": "#e74c3c"
  };

  // Realizamos un fetch para obtener las cartas guardadas
  fetch("/save")
    .then(response => response.json()) // convertimos la respuesta a JSON
    .then(savedCards => {
      // si existen cartas guardadas, las agregamos a las zonas correspondientes
      savedCards.forEach(cardData => {
        const card = generateCards().find(card => card.id === cardData.cartaId); // busca la carta correspondiente
        if (card) {
          const dropzone = document.getElementById(cardData.dropzone); // encuentra la dropzone correspondiente
          if (!dropzone.contains(card)) { // verifica si la carta ya está en el contenedor
            card.style.backgroundColor = colors[dropzone.id]; // establece el color de la carta
            dropzone.appendChild(card); // agrega la carta a la zona correspondiente
          }
        }
      });

      // Ajustar el tamaño de las dropzones después de agregar las cartas guardadas
      dropzones.forEach(dropzone => {
        const allCards = dropzone.querySelectorAll(".card");
        allCards.length > 6 ? adjustDropzoneSize(dropzone) : resetDropzoneSize(dropzone);
      });

      // verificar el número total de cartas antes de generar nuevas cartas
      const totalCards = document.querySelectorAll(".card").length;
      if (totalCards < 12) {
        // generamos las cartas restantes si es necesario
        const cards = generateCards().slice(0, 12 - totalCards);
        const half = Math.ceil(cards.length / 2);

        dropzones[0].append(...cards.slice(0, half).map(card => {
          card.style.backgroundColor = colors["dropzone1"];
          return card;
        }));
        dropzones[1].append(...cards.slice(half).map(card => {
          card.style.backgroundColor = colors["dropzone2"];
          return card;
        }));

        // ajustar el tamaño de las dropzones después de agregar las cartas generadas
        dropzones.forEach(dropzone => {
          const allCards = dropzone.querySelectorAll(".card");
          allCards.length > 6 ? adjustDropzoneSize(dropzone) : resetDropzoneSize(dropzone);
        });
      }

      const draggables = document.querySelectorAll(".card");
      setupDraggables(draggables, dropzones, colors);
    })
    .catch(error => console.error("Error al cargar las cartas guardadas:", error));
});

window.addEventListener("drop", (event) => {
  event.preventDefault(); // previene los posibles comportamientos por defecto del navegador

  const carta = event.target; // elemento que recibió el evento

  if (carta.classList.contains("card")) {
    const datos = {
      cartaId: carta.id, // obtenemos el id de la carta
      dropzone: carta.closest(".dropzone").id // buscamos el elemento más cercano que tenga la clase dropzone a partir de la carta y obtenemos su id para que pueda ser almacenado en el json y en no en el formato de objeto
    };

    console.log("Datos a enviar:", datos); // mostramos los datos a enviar
    fetch("/save", {
      method: "POST", // le devimos al servidor que vamos a enviar información
      headers: {
        "Content-Type": "application/json" // le decimos al servidor que vamos a enviar información en formato JSON
      },
      body: JSON.stringify(datos) // convertimos el objeto a formato JSON y lo enviamos al servidor
    })
    .then(
      response => response.json() // convertimos la respuesta a formato JSON para luego imprimir por consola la respuesta con data
    )
    .then(
      data => console.log(data) // mostramos la respuesta del servidor
    )
    .catch(
      error => console.error(error) // mostramos un mensaje de error en caso de que ocurra un error
    );
  }
});