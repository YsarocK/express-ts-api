"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StepsController = (0, express_1.Router)();
StepsController.get('/', function (req, res) {
    res.send("Vérification des étapes");
});
exports.default = StepsController;
