import { UI_BUILDER } from "./Ui.js";

export const UIv1 = UI_BUILDER.init();

UIv1.initUI = () => {
    const base = document.getElementById(UIv1.uiElements.board);
    base.classList.add("board");
}

UIv1.drawBoard = (board) => {
    if (board !== undefined) {
        const base = document.getElementById(UIv1.uiElements.board);
        base.innerHTML = '';
        base.style.gridTemplateColumns = `repeat(${board.length}, 100px)`;
        base.style.gridTemplateRows = `repeat(${board.length}, 100px)`;
        board.forEach(element => element.forEach((element) => {
            const tile = document.createElement("div");
            if (element === 5) {
                // const iElement = document.createElement("i");
                // iElement.className = "fa-solid fa-cloud";
                // iElement.style.color = "green";
                // td.appendChild(iElement);
                const iElement = document.createElement("i");
                iElement.className = "fa-solid fa-cloud";
                iElement.style.color = "green";
                tile.appendChild(iElement);
            }
            tile.classList.add("tile");
            base.appendChild(tile);
            anime({
                targets: tile,
                opacity: [0, 1],
                duration: (Math.random() * 8000) + 1000,
                easing: 'easeInOutQuad'
            });
        }));
    }
}

UIv1.drawBoard();

