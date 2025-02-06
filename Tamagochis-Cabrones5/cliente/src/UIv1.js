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
            const iElement = document.createElement("i");
            tile.classList.add("tile");
            base.appendChild(tile);
            
            // if (element == 5) {
            //     const bush = document.createElement("i");
            //     bush.className = "fa-solid fa-cloud";
            //     bush.style.color = "green";
            //     tile.appendChild(bush);
            // }

            // var elvisLives = Math.PI > 4 ? "Sip" : "Nop";

            iElement.className = element == 5 ? "fa-solid fa-cloud" : element == 1 ? "fa-solid fa-user" : "";

            tile.appendChild(iElement);

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

