import { io } from "../../node_modules/socket.io-client/dist/socket.io.esm.min.js";
import { GameService } from "./GameService.js";

export const ConnectionHandler = {
    connected: false,
    socket: null,
    url: null,
    gameService: new GameService(),

    init: (url, onConnectedCallBack, onDisconnectedCallBack, ui) => {
        let { socket } = ConnectionHandler; 
        socket = io(url);
        socket.onAny((event, data) => {
            const eventRequestData = {
                action: event, 
                data: data
            };

            ConnectionHandler.gameService.uiSetter = ui;
            ConnectionHandler.gameService.do(eventRequestData);
        });

        socket.on("connect", (data) => {
            
            socket.on("connectionStatus", (data) => {
                ConnectionHandler.connected = true;
                console.log(data);
                onConnectedCallBack();
            });
            socket.on("message", (payload) => {
                ConnectionHandler.gameService.do(payload);
            })
            socket.on("disconnect", () => {
                ConnectionHandler.connected = false;
                onDisconnectedCallBack();
            });
        })
    }
}