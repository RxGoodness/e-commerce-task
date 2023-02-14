import jwt from "jsonwebtoken";

//Token generator accepts any object or string
interface AnyObj {
  [key: string]: string;
}

export function genToken(data: AnyObj | string) {
  return jwt.sign(data, process.env.JWT_SECRET as string);
}

export function decode(token: string){
      return jwt.verify(token, process.env.JWT_SECRET as string)
    };