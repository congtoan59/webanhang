"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameController_1 = require("./controllers/GameController");
const GameItem_1 = require("./models/GameItem");
require("./style.css");
const rootElement = document.querySelector('#app');
var gameApp = null;
if (rootElement) {
    gameApp = new GameController_1.GameController([
        new GameItem_1.GameItem(1, '', '1.png'),
        new GameItem_1.GameItem(2, '', '2.png'),
        new GameItem_1.GameItem(3, '', '3.png'),
        new GameItem_1.GameItem(4, '', '4.png'),
        new GameItem_1.GameItem(5, '', '5.png'),
        new GameItem_1.GameItem(6, '', '6.png'),
        new GameItem_1.GameItem(7, '', '7.png'),
        new GameItem_1.GameItem(8, '', '8.png'),
        new GameItem_1.GameItem(9, '', '9.png'),
        new GameItem_1.GameItem(10, '', '10.png'),
    ], rootElement);
    gameApp.renderGameBoard();
}
