export function setupDraggables(draggables, dropzones, colors) {
  draggables.forEach((item) => {
    item.setAttribute("draggable", "true");

    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", e.target.id);
      e.target.style.opacity = "1";
      e.target.classList.add("dragging"); // Añadir clase de animación al iniciar el arrastre
    });

    item.addEventListener("dragend", (e) => {
      e.target.style.opacity = "";
      e.target.classList.remove("dragging"); // Quitar clase de animación al terminar el arrastre

      // Verificar si la carta fue soltada en una zona válida
      const dropzone = document.elementFromPoint(e.clientX, e.clientY);
      if (!dropzone || !dropzone.classList.contains("dropzone")) {
        e.target.classList.add("returning"); // Añadir clase para volver
        setTimeout(() => {
          e.target.classList.remove("returning"); // Quitar clase después de la animación
        }, 500); // Tiempo de duración de la animación
      }
    });
  });

  dropzones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      const card = document.getElementById(id);
    
      if (card) {
        zone.appendChild(card);
        if (colors[zone.id]) {
          card.style.backgroundColor = colors[zone.id];
        }
        dropzones.forEach((dropzone) => {
          const allCards = dropzone.querySelectorAll(".card");
          allCards.length > 6 ? adjustDropzoneSize(dropzone) : resetDropzoneSize(dropzone);
        });
      }
    });
  });
}

export function adjustDropzoneSize(zone) {
  const cards = zone.querySelectorAll(".card");
  const rows = Math.ceil(cards.length / 3);
  const newHeight = 300 + (rows - 1) * 55;
  const newWidth = Math.max(300, Math.ceil(cards.length / rows) * 100);
  
  zone.style.height = `${newHeight}px`;
  zone.style.width = `${newWidth}px`;
}

export function resetDropzoneSize(zone) {
  zone.style.height = `300px`;
  zone.style.width = `300px`;
}