const MAIN_PATH = "/cliente/assets/sounds/";

export const soundsList = {
    "NEW_PLAYER": MAIN_PATH + "newplayer.mp3",
    "DISCONNECTED": MAIN_PATH + "disconnected.mp3",
    "MOVEMENT": MAIN_PATH + "movement.mp3",
    "ROTATE": MAIN_PATH + "rotate.mp3",
    "SHOT": MAIN_PATH + "shot.mp3",
    "BACKGROUND_MUSIC": MAIN_PATH + "background_music.mp3",
    "GAME_START": MAIN_PATH + "gamestart.mp3",
    "GAME_OVER": MAIN_PATH + "gameover.mp3",
};

export function playSound(soundPath, volume, loop) {
    try {
        const audio = new Audio(soundPath);
        audio.loop = loop || false;
        audio.volume = volume || 0.2;
        audio.play().catch(error => console.error("Error al reproducir el sonido:", error));
    } catch (e) {
        console.error("Error inesperado:", e);
    }
}
