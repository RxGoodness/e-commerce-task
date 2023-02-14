"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.createAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const gen_token_1 = require("../utils/gen.token");
const users_1 = __importDefault(require("../model/users"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validator_1 = require("../middleware/validator");
const createAdmin = (0, express_async_handler_1.default)(async (req, res) => {
    const body = req.body;
    await validator_1.AdminJoiSchema.validateAsync(body);
    const adminExists = await users_1.default.findOne({ email: body.email });
    if (adminExists)
        return res.status(400).json({ msg: "User already exist with this email, Please log in" });
    const { confirmPassword, email, ...data } = body;
    const securedPass = await bcryptjs_1.default.hash(confirmPassword, 10);
    //create data to the database with the hashed password
    const admin = await users_1.default.create({ ...data, email, password: securedPass });
    const token = (0, gen_token_1.genToken)(admin.id);
    return res.status(200).json({ admin, token });
});
exports.createAdmin = createAdmin;
const loginAdmin = (0, express_async_handler_1.default)(async (req, res) => {
    const body = req.body;
    await validator_1.AdminLoginSchema.validateAsync(body);
    const { email, password } = body;
    const admin = await users_1.default.findOne({ email });
    if (admin && (await bcryptjs_1.default.compare(password, admin.password))) {
        const token = (0, gen_token_1.genToken)(admin.id);
        return res.status(200).json({ admin, token });
    }
    else {
        res.status(401).json({ msg: "Invalid credentials" });
    }
});
exports.loginAdmin = loginAdmin;
