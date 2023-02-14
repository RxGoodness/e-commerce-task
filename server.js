"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const default_1 = __importDefault(require("./config/default"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const startServer = async () => {
    try {
        await (0, db_1.default)();
        app_1.default.listen(default_1.default.port, () => {
            console.log(`Server running on port ${default_1.default.port}`);
        });
    }
    catch (error) {
        console.error(error);
    }
};
startServer();
