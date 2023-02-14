"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductJoiSchema = exports.AdminLoginSchema = exports.AdminJoiSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// const PasswordRegex =
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
// const PasswordError =
//   "Password must be at least 8 character, include uppercase, lowercase, digit and special character.";
const AdminJoiSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().message("Enter valid email").required(),
    password: joi_1.default.string().min(8).message("Paasword must be upto 8 characters").required(),
    confirmPassword: joi_1.default.string().required().valid(joi_1.default.ref("password")),
});
exports.AdminJoiSchema = AdminJoiSchema;
const AdminLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).message("Paasword must be upto 8 characters").required(),
});
exports.AdminLoginSchema = AdminLoginSchema;
const ProductJoiSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    description: joi_1.default.string(),
    category: joi_1.default.string(),
});
exports.ProductJoiSchema = ProductJoiSchema;
