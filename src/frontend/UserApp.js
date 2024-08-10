"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserControllers_1 = require("./controllers/UserControllers");
const appElement = document.querySelector('#app');
console.log('Login form');
if (appElement) {
    let usercontroller = new UserControllers_1.UserController(appElement);
}
