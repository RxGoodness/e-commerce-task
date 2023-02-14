import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {genToken} from "../utils/gen.token";
import AdminDB from "../model/users";
import asyncHandler from "express-async-handler";
import {
  AdminJoiSchema,
  AdminLoginSchema,
} from "../middleware/validator";


const createAdmin = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const body = req.body;
    await AdminJoiSchema.validateAsync(body);
    const adminExists = await AdminDB.findOne({ email: body.email });
    if (adminExists)
      return res.status(400).json({ msg: "User already exist with this email, Please log in" });
    const { confirmPassword, email, ...data } = body;
    const securedPass = await bcrypt.hash(confirmPassword, 10);

    //create data to the database with the hashed password
    const admin = await AdminDB.create({ ...data, email, password: securedPass });
    const token = genToken(admin.id);
    return res.status(200).json({admin, token });
  }
);

const loginAdmin = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const body= req.body;
    await AdminLoginSchema.validateAsync(body);
    const { email, password } = body;
    const admin = await AdminDB.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = genToken(admin.id);
      return res.status(200).json({ admin, token });
    } else {
      res.status(401).json({ msg: "Invalid credentials" });
    }
  }
);

export { createAdmin, loginAdmin };
