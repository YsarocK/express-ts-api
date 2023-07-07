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
const ssh_1 = require("../utils/ssh");
const user_folder_exist_1 = __importDefault(require("../exercises/user-folder-exist"));
const connect_to_host_1 = __importDefault(require("../exercises/connect-to-host"));
const TESTS_STEPS = [
    user_folder_exist_1.default,
    connect_to_host_1.default
];
const ExercisesController = (0, express_1.Router)();
ExercisesController.post('/verify', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { host, username } = req.body;
        const getResults = () => __awaiter(this, void 0, void 0, function* () {
            const results = yield (0, ssh_1.session)(host, username)
                .then((el) => {
                return TESTS_STEPS.map((test) => __awaiter(this, void 0, void 0, function* () {
                    return yield test(el);
                }));
            })
                .catch((err) => {
                return [];
            });
            const resolvedResults = Promise.all(results);
            return resolvedResults;
        });
        console.log(`${host}:${username}`);
        const results = yield getResults();
        res.json({
            score: results.filter((el) => el.passed).length,
            tests: results.length ? results : 'Cannot connect to host'
        });
    });
});
exports.default = ExercisesController;
