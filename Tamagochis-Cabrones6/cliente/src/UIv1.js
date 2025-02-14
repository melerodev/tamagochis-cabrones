import { UI_BUILDER } from "./Ui.js";

export const UIv1 = UI_BUILDER.init();

let rotationDegrees = 0;

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
                iElement.setAttribute("socket-id", element.id);
            } else {
                iElement.className = "";
            }

            tile.appendChild(iElement);

            // anime({
            //     targets: tile,
            //     opacity: [0, 1],
            //     duration: (Math.random() * 8000) + 1000,
            //     easing: 'easeInOutQuad'
            // });
        }));
    }
}

UIv1.deleteBoard = () => {
    const base = document.getElementById(UIv1.uiElements.board);
    console.log(base);

    base.innerHTML = '';
}

UIv1.sendNotification = (message, error) => {
    const notyf = new Notyf({
        duration: 3000,
        position: { x: "right", y: "top" },
        dismissible: true,
    });
    
    // var audio = new Audio('/cliente/assets/sounds/notification.mp3');
    // audio.volume = 0.2;
    // audio.play();

    if (error) {
        notyf.error(message);
    } else {
        notyf.success(message);
    }
}


UIv1.movePlayer = (data) => {
    console.log(data);
    let iElement = document.createElement("i");
    iElement.className = "fa-solid fa-person black";
    iElement.setAttribute("socket-id", data.id);
    document.querySelector(`[socket-id="${data.id}"]`).remove();
    document.querySelector(`[data-x="${data.x}"][data-y="${data.y}"]`).appendChild(iElement);
}

UIv1.rotatePlayer = (data) => {
    if (rotationDegrees == 360) {
        rotationDegrees = 0;
    } 
    rotationDegrees += 90;
    const player = document.querySelector(`[socket-id="${data.id}"]`);
    player.style.transform = `rotate(${rotationDegrees}deg)`;
}

UIv1.firePlayer = (data) => {
    console.log(data);
}