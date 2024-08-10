"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const GameItem_1 = require("../models/GameItem");
const lodash_1 = __importDefault(require("lodash"));
let GameController = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _processGameItemClicked_decorators;
    let _processResetButtonClicked_decorators;
    return _a = class GameController {
            constructor(items, element) {
                this.element = (__runInitializers(this, _instanceExtraInitializers), element);
                this.items = [];
                this.initGame(items);
            }
            initGame(initData) {
                for (const item of initData) {
                    this.items.push(item);
                    this.items.push(new GameItem_1.GameItem(item.id, item.divId, item.image));
                }
                let id = 1;
                this.items.forEach(it => {
                    it.status = GameItem_1.GameItemStatus.Close;
                    it.divId = 'd' + id;
                    id++;
                });
            }
            //khi nguoi dung nhan vao nut reset game
            reinitGame() {
                this.items.forEach(item => {
                    item.imageElement = null;
                    item.status = GameItem_1.GameItemStatus.Close;
                    item.isMatched = false;
                });
                this.shuffle();
            }
            //kiem tra nguoi dung chien thang hay chua, trang thai cua game la m thi chien thang
            isWinGame() {
                return this.items.filter(item => item.status === GameItem_1.GameItemStatus.Open).length === this.items.length;
            }
            //hien thi giao dien
            renderHTML(rootElement, item) {
                // <div class="col-2 gameItem m-2 p1 text-center">
                //             <img src="https://pngimg.com/uploads/pokemon/pokemon_PNG12.png" alt="" class="img-fluid">
                //         </div>
                const divItem = document.createElement('div');
                divItem.className = 'col-2 gameItem m-2 p-1 text-center';
                divItem.id = item.divId;
                divItem.addEventListener('click', this.processGameItemClicked);
                const imgItem = document.createElement('img');
                imgItem.src = `images/${item.image}`;
                imgItem.className = 'img-fluid invisible';
                item.imageElement = imgItem;
                divItem.appendChild(imgItem);
                rootElement.appendChild(divItem);
            }
            //hien thi thong tin luc reset
            renderResetButton(rootElement) {
                let button = rootElement.querySelector('button#reset');
                if (button) {
                    button.addEventListener('click', this.processResetButtonClicked);
                }
            }
            //hien thi toan bo thong tin o tren game
            renderGameBoard() {
                this.shuffle();
                let boardDiv = this.element.querySelector('#board');
                if (boardDiv) {
                    this.items.forEach(it => {
                        this.renderHTML(boardDiv, it);
                    });
                }
                this.renderResetButton(this.element);
            }
            //kien so khop=> neu trung khop giu nguyen, ko trung khop thi dong lai
            isMatched(id, imgElement) {
                let openedItems = this.items.filter(item => {
                    if (item.status === GameItem_1.GameItemStatus.Open && !item.isMatched) {
                        return item;
                    }
                });
                if (openedItems.length == 2) {
                    let checkMatchedFilter = openedItems.filter(item => item.id == id);
                    if (checkMatchedFilter.length < 2) {
                        openedItems.forEach(item => {
                            this.changeMatchedBackgroud(item.imageElement, false);
                        });
                        setTimeout(() => openedItems.forEach(item => {
                            if (item.imageElement) {
                                item.imageElement.className = 'img- fluid invisible';
                                item.status = GameItem_1.GameItemStatus.Close;
                                item.isMatched = false;
                                this.changeMatchedBackgroud(item.imageElement);
                            }
                        }), 600);
                    }
                    else {
                        openedItems.forEach(item => {
                            item.isMatched = true;
                            this.changeMatchedBackgroud(item.imageElement);
                        });
                        return true;
                    }
                }
                return false;
            }
            //2tp ko trung => thay doi mau nen
            changeMatchedBackgroud(imgElement, isMatched = true) {
                if (imgElement === null || imgElement === void 0 ? void 0 : imgElement.parentElement) {
                    if (isMatched) {
                        imgElement.parentElement.className = 'col-2 gameItem m-1 p-1 text-center';
                    }
                    else {
                        imgElement.parentElement.className = 'col-2 gameItem m-1 p-1 text-center unmatched';
                    }
                }
            }
            processGameItemClicked(event) {
                let element = event.target;
                if (element.tagName === 'img') {
                    element = element.parentElement;
                }
                for (const item of this.items) {
                    if (item.divId == (element === null || element === void 0 ? void 0 : element.id) && !item.isMatched
                        && item.status === GameItem_1.GameItemStatus.Close) {
                        item.status = GameItem_1.GameItemStatus.Open;
                        let imgElement = element.querySelector('img');
                        if (imgElement) {
                            imgElement.className = 'img-fluid visible';
                            //t
                            this.isMatched(item.id, imgElement);
                        }
                    }
                }
            }
            processResetButtonClicked(event) {
                this.reinitGame();
                const boardElement = document.querySelector('#board');
                boardElement.innerHTML = '';
                this.renderGameBoard();
            }
            //xáo trộn nhung tp 
            shuffle() {
                this.items = lodash_1.default.shuffle(this.items);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _processGameItemClicked_decorators = [autobind_decorator_1.default];
            _processResetButtonClicked_decorators = [autobind_decorator_1.default];
            __esDecorate(_a, null, _processGameItemClicked_decorators, { kind: "method", name: "processGameItemClicked", static: false, private: false, access: { has: obj => "processGameItemClicked" in obj, get: obj => obj.processGameItemClicked }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _processResetButtonClicked_decorators, { kind: "method", name: "processResetButtonClicked", static: false, private: false, access: { has: obj => "processResetButtonClicked" in obj, get: obj => obj.processResetButtonClicked }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.GameController = GameController;
