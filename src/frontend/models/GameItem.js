"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameItem = exports.GameItemStatus = void 0;
var GameItemStatus;
(function (GameItemStatus) {
    GameItemStatus[GameItemStatus["Open"] = 0] = "Open";
    GameItemStatus[GameItemStatus["Close"] = 1] = "Close";
})(GameItemStatus || (exports.GameItemStatus = GameItemStatus = {}));
class GameItem {
    constructor(id, divId, image, status = GameItemStatus.Close, isMatched = false, imageElement = null) {
        this.id = id;
        this.divId = divId;
        this.image = image;
        this.status = status;
        this.isMatched = isMatched;
        this.imageElement = imageElement;
    }
}
exports.GameItem = GameItem;
