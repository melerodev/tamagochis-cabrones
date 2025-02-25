const UI = {
    drawBoard: () => { throw new TypeError('Debes cambiar este método para usarlo!') },
    deleteBoard: () => { throw new TypeError('Debes cambiar este método para usarlo!') },
    sendNotification: () => { throw new TypeError('Debes cambiar este método para usarlo!') },
    movePlayer: () => { throw new TypeError('Debes cambiar este método para usarlo!') },
    rotatePlayer: () => {throw new TypeError("Debes cambiar este método para usarlo!") },
    gameWaiting: () => { throw new TypeError('Debes cambiar este método para usarlo!') },

    firePlayer: () => { throw new TypeError('Debes cambiar este método para usarlo!') },
    initUI: ()  => { throw new TypeError('Debes cambiar este método para usarlo!') },
    
    uiElements : {
        board : "board"
    }
}

export const UI_BUILDER = {
    init: () => ({...UI})
}