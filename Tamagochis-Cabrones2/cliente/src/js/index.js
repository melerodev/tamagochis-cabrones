import { io } from "../../node_modules/socket.io-client/dist/socket.io.esm.min.js";
import { BoardHandler } from "./BoardHandler.js";

const socket = io("http://localhost:3000");
socket.on("connection", (data) => {
    console.log("estoy conectado");
});

socket.on("board", (data) => {
    console.log(data);
    BoardHandler.init(10, 10, 4);
});

console.log(socket);