import { Request } from "express";
import { AdminType } from "../../src/config/validator";
// import { Files } from "./interfaces";
declare global {
  namespace Express {
    interface Request {
      //Put properties to add to request here
      user: any;
    //   files: Array<Files>;
    }
  }
//   module "*.jpg";
}
