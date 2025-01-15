import { ConnectionHandler } from "./ConnectionHandler.js";
import { Tablero } from "./Tablero.js";

ConnectionHandler.init("http://localhosñt:3000", "Se ha conectado", "Se ha desconectado");

Tablero.init(8, 8, 4);