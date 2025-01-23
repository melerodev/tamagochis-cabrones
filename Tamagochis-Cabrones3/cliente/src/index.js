import { ConnectionHandler } from "./services/ConnectionHandler.js";
ConnectionHandler.init("http://localhost:3000", () => {
    console.log("all right")
    }, () => {
        console.log("all bad")
    }); 
// const socket = io("http://localhost:3000");

// socket.on("connection", (data) => {
//     console.log("estoy conectado");
//     socket.on("respuesta", (dato) => {
//         console.log(dato);
//     });
// });


// console.log(socket);

// socket.emit("mensaje", "hola");