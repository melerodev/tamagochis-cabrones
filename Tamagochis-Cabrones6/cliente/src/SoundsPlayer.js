export const soundsList = {
    "NEW_PLAYER": "/cliente/assets/sounds/newplayer.mp3",
    "DISCONNECTED": "/cliente/assets/sounds/disconnected.mp3",
    "MOVEMENT": "/cliente/assets/sounds/movement.mp3",
    "ROTATE": "/cliente/assets/sounds/rotate.mp3",
    "SHOT": "/cliente/assets/sounds/shot.mp3",
    "BACKGROUND_MUSIC": "/cliente/assets/sounds/background_music.mp3",
    "GAME_OVER": "/cliente/assets/sounds/gameover.mp3",
};

export function playSound(soundPath, volume) {
    try {
        const audio = new Audio(soundPath.toString());
        audio.volume = volume || 0.2;
        audio.play().catch(err => console.error("Error al reproducir el sonido:", err));
    } catch (e) {
        console.error("Error inesperado:", e);
    }
}
