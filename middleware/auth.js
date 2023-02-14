"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protection = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const users_1 = __importDefault(require("../model/users"));
const default_1 = __importDefault(require("../config/default"));
const protection = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send('Access denied. No token provided');
    try {
        const token = authHeader.split(" ")[1];
        const decoded = (0, jsonwebtoken_1.verify)(token, default_1.default.jwtSecret);
        console.log(decoded);
        console.log("token", token);
        req.user = await users_1.default.findById(decoded);
        next();
    }
    catch (err) {
        res.status(400).send('Invalid token!!!!');
    }
};
exports.protection = protection;
