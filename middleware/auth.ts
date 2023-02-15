import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import AdminDB from "../model/users";

import envValues  from '../config/default';

export const protection = async (
req: Request,
res: Response,
next: NextFunction
) => {
const authHeader = req.headers.authorization;
if (!authHeader) return res.status(401).send('Access denied. No token provided');
try {
   const token = authHeader.split(" ")[1];
const decoded = verify(token, envValues.jwtSecret);
req.user = await AdminDB.findById(decoded as JwtPayload)
next();
} catch (err) {
res.status(400).send('Invalid token!');
}
}