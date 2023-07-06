"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ssh_connexion_1 = __importDefault(require("../exercises/ssh-connexion"));
const tests = [
    ssh_connexion_1.default,
    ssh_connexion_1.default,
    ssh_connexion_1.default,
];
const ExercisesController = (0, express_1.Router)();
ExercisesController.post('/verify', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let score = 0;
        let error = '';
        for (let index = 0; index < 1; index++) {
            try {
                yield tests[index](req.body.host, req.body.username);
                score++;
            }
            catch (err) {
                error = err;
                return;
            }
        }
        res.json({
            score: `${score} / 10`,
            error: error
        });
    });
});
exports.default = ExercisesController;
