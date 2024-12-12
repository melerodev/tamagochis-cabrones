import { setupDraggables } from "./uiDrag.js";
import { generateCards } from "./letterGenerator.js";

document.addEventListener("DOMContentLoaded", () => {
  const dropzones = document.querySelectorAll(".dropzone");
  const colors = {
    "dropzone1": "#3498db",
    "dropzone2": "#e74c3c"
  };

  const cards = generateCards();
  const half = Math.ceil(cards.length / 2);

  dropzones[0].append(...cards.slice(0, half).map(card => {
    card.style.backgroundColor = colors["dropzone1"];
    return card;
  }));
  dropzones[1].append(...cards.slice(half).map(card => {
    card.style.backgroundColor = colors["dropzone2"];
    return card;
  }));

  const draggables = document.querySelectorAll(".card");
  setupDraggables(draggables, dropzones, colors);
});