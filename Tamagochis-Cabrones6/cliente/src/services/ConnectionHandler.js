import { io } from "../../node_modules/socket.io-client/dist/socket.io.esm.min.js";

const keys = {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    R: "r",
    SPACE: " ",
};

export const ConnectionHandler = {
    connected: false,
    socket: null,
    url: null,
    controller: null,
    init: (url, controller, onConnectedCallBack, onDisconnectedCallBack) => {
        ConnectionHandler.controller = controller;
        let { socket } = ConnectionHandler;
        socket = io(url);
        socket.onAny((message, payload) => {
        });

        socket.on("connect", (data) => {
            socket.on("connectionStatus", (data) => {
                ConnectionHandler.connected = true;
                onConnectedCallBack();
            });

            socket.on("message", (payload) => {
                ConnectionHandler.controller.actionController(payload);
            })

            socket.on("disconnect", () => {
                ConnectionHandler.connected = false;
                onDisconnectedCallBack();
            });
        })

        document.addEventListener("keydown", (event) => {
            // por un timeout evitar que el servidor se sature con mensajes de teclado
            setTimeout(() => {
                if (Object.values(keys).includes(event.key)) {
    
                    socket.emit("message", { type: "ACTION", data: { key: event.key, socketId: socket.id }});
                }
            }, 200);
        });
    }
}