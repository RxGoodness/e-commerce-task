import { Request, Response, NextFunction } from 'express';

export const errorsHandler = (
err: Error,
req: Request,
res: Response,
next: NextFunction
) => {
console.error(err.message);
return res.status(500).send('Server Error');
};
