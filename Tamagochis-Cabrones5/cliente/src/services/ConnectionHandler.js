import { io } from "../../node_modules/socket.io-client/dist/socket.io.esm.min.js";

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
            
            document.addEventListener("keydown", (event) => ConnectionHandler.controller.actionController(
                {
                    type: "MOVEMENT",
                    content : {event: event, socket: socket}
                }
            ));    

            socket.on("disconnect", () => {
                ConnectionHandler.connected = false;
                onDisconnectedCallBack();
            });
        })
    }
}