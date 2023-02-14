import { Request, Response, NextFunction } from 'express';

export const pagination = (
req: Request,
res: Response,
next: NextFunction
) => {
    const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
const startIndex = (page - 1) * limit;
const endIndex = page * limit;

 const pagination = {
startIndex,
endIndex
};
next();
};