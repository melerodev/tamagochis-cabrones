import { io, Socket } from "../../node_modules/socket.io-client/dist/socket.io.esm.min.js";

export const ConnectionHandler = {
    players: [],
    init(url, connectedCallback, disconnectedCallback) {
        const socket = io(url);

        socket.on("connect", () => {
            console.log(connectedCallback);
            // socket.emit("mensaje", "hola");
        });

        socket.on("disconnect", (reason) => {
            console.log(disconnectedCallback);
            console.log(reason);
        });

        document.querySelector(".join").addEventListener("click", () => {
            socket.emit("joinRoom", "hola");
        });
    },
}