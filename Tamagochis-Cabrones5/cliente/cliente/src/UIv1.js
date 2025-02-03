import { UI_BUILDER } from "./Ui.js";

export const UIv1 = UI_BUILDER.init();
UIv1.drawBoard= (board)=>{
    console.log('Esto llega a UI')
    console.log(board);
    
}
UIv1.drawBoard();

