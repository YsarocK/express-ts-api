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
exports.session = exports.ssh = void 0;
const node_ssh_1 = require("node-ssh");
const path_1 = require("path");
const ssh = new node_ssh_1.NodeSSH();
exports.ssh = ssh;
const session = (host, username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ssh.connect({
        host: host,
        username: username,
        privateKeyPath: (0, path_1.resolve)('./id_admin-1')
    });
});
exports.session = session;
