import db  from './config/db';
import envValues  from './config/default';
import dotenv from "dotenv";
// import app from './app';
dotenv.config();
import app from './app';

const startServer = async () => {
    try {
        await db();
        app.listen(envValues.port, () => {
            console.log(`Server running on port ${envValues.port}`);
        });
    } catch (error) {
        console.error(error);
    }
};

startServer();
