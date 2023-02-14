"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.genToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function genToken(data) {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET);
}
exports.genToken = genToken;
function decode(token) {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
}
exports.decode = decode;
;
