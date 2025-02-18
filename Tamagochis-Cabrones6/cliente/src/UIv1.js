import { UI_BUILDER } from "./Ui.js";
import { soundsList, playSound } from "./SoundsPlayer.js";

export const UIv1 = UI_BUILDER.init();

UIv1.initUI = () => {
    const base = document.getElementById(UIv1.uiElements.board);
    base.classList.add("board");
}

UIv1.drawBoard = (board) => {
    if (board !== undefined) {
        const base = document.getElementById(UIv1.uiElements.board);

        let coords = {x: 0, y: 0};

        base.innerHTML = '';

        base.style.gridTemplateColumns = `repeat(${board.length}, 100px)`;
        base.style.gridTemplateRows = `repeat(${board.length}, 100px)`;

        board.forEach(element => element.forEach((element) => {
            const tile = document.createElement("div");
            const iElement = document.createElement("i");
            tile.classList.add("tile");

            tile.setAttribute("data-x", coords.x);
            tile.setAttribute("data-y", coords.y);

            coords.y++;

            if (coords.y == board.length) {
                coords.x++;
                coords.y = 0;
            }

            base.appendChild(tile);

            if (element.type == 5) {
                iElement.className = "fa-solid fa-cloud";
                iElement.style.color = "green";
            } else if (element.type == 1) {
                iElement.className = "fa-solid fa-person";
                if (element.visibility == false) {
                    iElement.style.visibility = "hidden";
                }
                iElement.setAttribute("socket-id", element.id);
            } else {
                iElement.className = "";
            }

            tile.appendChild(iElement);
        }));

        playSound(soundsList.GAME_START, 1);
        playSound(soundsList.BACKGROUND_MUSIC, 0.3, true);

        if(document.querySelector(".waiting")) {
            document.querySelectorAll(".waiting").forEach(element => element.remove());
        }
    }
}

UIv1.deleteBoard = (winner) => {
    const base = document.getElementById(UIv1.uiElements.board);
    base.innerHTML = '';
    // playSound(soundsList.BACKGROUND_MUSIC, 0, false); ESTO NO FUNCIONA PARA PARAR LA MÚSICA DE FONDO
    playSound(soundsList.GAME_OVER, 1);
    playSound(soundsList.VICTORY_BACKGROUND_MUSIC, 0.3, true);
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    h1.classList.add("waiting");
    h2.classList.add("waiting");
    h1.textContent = "El juego ha terminado. ¡Gracias por jugar! 🎮";
    h2.textContent = `Ha ganado el jugador: ${winner} 🏆 !`;
    document.body.appendChild(h1);
}

UIv1.sendNotification = (params) => {
    const notyf = new Notyf({
        duration: params.duration || 3000,
        position: {x: params.position.x, y: params.position.y} || { x: "right", y: "top" },
        dismissible: params.dismissible || true,
    });

    playSound(soundsList.NEW_PLAYER, 1);

    if (params.error) {
        notyf.error(params.message);
    } else {
        notyf.success(params.message);
    }

    setTimeout(() => {
        document.querySelector(".notyf").remove();
        document.querySelector(".notyf-announcer").remove();
    }, 3000);
}


UIv1.movePlayer = (data) => {
    let iElement = document.createElement("i");
    iElement.className = "fa-solid fa-person black";
    iElement.setAttribute("socket-id", data.id);
    document.querySelector(`[socket-id="${data.id}"]`).remove();

    playSound(soundsList.MOVEMENT, 1);

    if (data.visibility == false) {
        iElement.style.visibility = "hidden";
    }

    document.querySelector(`[data-x="${data.x}"][data-y="${data.y}"]`).appendChild(iElement);

    UIv1.rotatePlayer({id: data.id, direction: data.direction}, true);
}

UIv1.rotatePlayer = (data, isInternalCall = false) => {
    let rotation = 0;
    switch(data.direction) {
        case "UP":
            rotation = 0;
            break;
        case "RIGHT":
            rotation = 90;
            break;
        case "DOWN":
            rotation = 180;
            break;
        case "LEFT":
            rotation = 270;
            break;
    }

    // Si NO es una llamada interna, reproducir el sonido
    if (!isInternalCall) {
        playSound(soundsList.ROTATE, 1);
    }

    document.querySelector(`[socket-id="${data.id}"]`).style.transform = `rotate(${rotation}deg)`;
}


UIv1.firePlayer = (data) => {
    playSound(soundsList.SHOT, 1);
    if (document.querySelector(`[socket-id="${data.id}"]`)) {
        document.querySelector(`[socket-id="${data.id}"]`).remove();
    }
}

UIv1.gameWaiting = (data) => {
    const h1 = document.createElement("h1");
    h1.classList.add("waiting");
    h1.textContent = "Esperando a que haya " + (data.maxPlayers - data.players.length) + " jugador/es más...";
    document.body.appendChild(h1);
}