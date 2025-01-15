import { ConnectionHandler } from "./ConnectionHandler.js";
import { TableroHandler } from "./TableroHandler.js";

ConnectionHandler.init("http://localhost:3000", "Se ha conectado", "Se ha desconectado");
TableroHandler.init(8, 8, 4);