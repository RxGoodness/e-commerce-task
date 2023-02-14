"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
// import logger from "morgan";
const express_1 = __importDefault(require("express"));
// Import Routes controllers
const users_1 = __importDefault(require("./routes/users"));
const products_1 = __importDefault(require("./routes/products"));
// Error handlers
const notFound_1 = __importDefault(require("./middleware/notFound"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
// import errorHandlerMiddleware from "./config/errorHandler";
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
// app.use(logger("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/public", express_1.default.static("public"));
// Routes
app.use("/api/users", users_1.default);
app.use("/api/products", products_1.default);
app.use(notFound_1.default);
app.use(errorHandler_1.default);
exports.default = app;
