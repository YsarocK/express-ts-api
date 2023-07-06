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
Object.defineProperty(exports, "__esModule", { value: true });
const ssh_1 = require("../utils/ssh");
function default_1(host, username) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, ssh_1.session)(host, username)
            .then(() => {
            return ssh_1.ssh.execCommand('ls -l');
        })
            .catch((err) => {
            throw new Error(err);
        });
    });
}
exports.default = default_1;
