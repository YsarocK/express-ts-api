"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController = (0, express_1.Router)();
UserController.get('/link', function (req, res) {
    res.send("Envoi d'un magic link lol");
});
exports.default = UserController;
