import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET as string,
  mongoURI: process.env.MONGO_URI 
};
