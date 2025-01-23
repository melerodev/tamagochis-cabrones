import { io } from "../../node_modules/socket.io-client/dist/socket.io.esm.min.js";
import { GameService } from "./GameService.js";

export const ConnectionHandler = {
    connected: false,
    socket: null,
    url: null,
    gameService: new GameService(),
    init: (url, onConnectedCallBack, onDisconnectedCallBack) => {
        let { socket } = ConnectionHandler; 
        socket = io(url);
        // socket.onAny((data) => {
        //     console.log("Esta llegando: " + data);
        //     ConnectionHandler.gameService.do(data);
        // });
        socket.on("connect", (data) => {
            socket.on("connectionStatus", (data) => {
                ConnectionHandler.connected = true;
                console.log(data);
                onConnectedCallBack();
            });
        })

        socket.on('message', (data) => {
            console.log(data);
            // ConnectionHandler.gameService.do(data);
        });
    }
}