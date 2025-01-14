import { Player } from "../player/entities/Player";
import { Room } from "./entities/Room";

export class RoomService {
    private rooms: Room[];
    private static instance: RoomService;
    private constructor() {
        this.rooms = [];
    };

    static getInstance(): RoomService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new RoomService();
        return this.instance;
    }

    public addPlayer(player: Player) {
        const room = this.rooms.find((item) => item.occupied == false); // busca una sala que no esté ocupada

        if (room == undefined) {
            const genRanHex = (size: Number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            const currentRoom: Room = {
                name: "room" + genRanHex(128),
                players: [player],
                occupied: false
            }
            this.rooms.push(currentRoom);
            player.id.join(currentRoom.name as string);
        } else {
            room.players.push(player);
            if (room.players.length == 4) room.occupied = true;
            player.id.join(room.name as string);
        }

        // aquí por alguna extraña razón TS me decía "room es posiblemente "undefined", 
        // así que lo que hice fue preguntar si room era undefined y si no lo era
        if (room) {
            console.log("Player " + player.id.id + " added to room " + room.name);
        }
    }

    public removePlayer(player: Player) {
        const room = this.rooms.find((item) => item.players.includes(player)); // busca la sala en la que se encuentra el jugador

        if (room == undefined) { // si no se encuentra la sala, lanza un error
            throw new Error("Player not found in any room");
        }

        room.players = room.players.filter((item) => item != player); // elimina al jugador de la sala
        if (room.players.length == 0) { // si la sala queda vacía, la elimina
            this.rooms = this.rooms.filter((item) => item != room);
        }

        console.log("Player " + player.id.id + " removed from room " + room.name);
    }

    public getRoomByPlayer(player: Player): Room {
        const room = this.rooms.find((item) => item.players.includes(player)); // busca la sala en la que se encuentra el jugador

        if (room == undefined) { // si no se encuentra la sala, lanza un error
            throw new Error("Player not found in any room");
        }

        return room;
    }

    public getNumPlayersInRoom(room: Room): number {
        if (!this.rooms.includes(room)) { // si la sala no existe, lanza un error
            throw new Error("The room doesn't exist");
        }
        return room.players.length;
    }

    public deleteRoom(room: Room) {
        if (!this.rooms.includes(room)) { // si la sala no existe, lanza un error
            throw new Error("The room doesn't exist");
        }

        this.rooms = this.rooms.filter((item) => item != room);
        console.log("Room " + room.name + " deleted");
    }
}
