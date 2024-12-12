export function generateCards() {
  const suits = ["Bastos", "Oros", "Copas", "Espadas"];
  const cards = [];

  suits.forEach((suit, index) => {
    for (let i = 1; i <= 3; i++) { // Cambiar de 2 a 4 para generar 4 cartas por palo
      const card = document.createElement("div");
      card.classList.add("card");
      card.id = `card-${suit}-${i}`; // Asignar un id único a cada carta
      card.innerHTML = `
        <span class="corner top-left">${index + 1}</span>
        <span class="center">${suit}</span>
        <span class="corner top-right">${index + 1}</span>
      `;
      cards.push(card);
    }
  });

  return cards;
}