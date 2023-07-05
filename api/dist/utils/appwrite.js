"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = exports.databases = exports.client = void 0;
const node_appwrite_1 = require("node-appwrite");
const client = new node_appwrite_1.Client();
exports.client = client;
client
    .setEndpoint(process.env.APPWRITE_ENDPOINT || '')
    .setProject(process.env.APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');
const databases = new node_appwrite_1.Databases(client);
exports.databases = databases;
const account = new node_appwrite_1.Account(client);
exports.account = account;
