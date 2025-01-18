import { io } from "../../node_modules/socket.io-client/dist/socket.io.esm.min.js";
import { BoardHandler } from "./BoardHandler.js";

const socket = io("http://localhost:3000");

socket.on("connection", (data) => {
    console.log(data);
});

socket.emit("message", "movement");

socket.on("board", (data) => {
    BoardHandler.init(10, 10, data);
});

socket.on("disconnect", (data) => {
    BoardHandler.init(10, 10, data);
});