import { io, Socket } from "../../node_modules/socket.io-client/dist/socket.io.esm.min.js";
import { TableroHandler } from "./TableroHandler.js";

export const ConnectionHandler = {
    init(url, connectedCallback, disconnectedCallback) {
        const socket = io(url);
        let playersCount;
        
        socket.on("connect", () => {
            console.log(connectedCallback);

            socket.on("updatePlayers", (data) => {
                TableroHandler.addPlayerFromTablero(data ,socket.id);
            });
        });

        socket.on("disconnect", (reason) => {
            console.log(disconnectedCallback);
            console.log(reason);
            TableroHandler.removePlayerFromTablero(socket.id);
        });

        socket.on("game", (players) => {
            this.players = players;
        });
    },
}