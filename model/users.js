"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Enter your name"],
    },
    email: {
        type: String,
        required: [true, "Enter valid email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Enter a password"],
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("AdminDB", AdminSchema);
