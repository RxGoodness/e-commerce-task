import cors from "cors";
// import logger from "morgan";
import express from "express";

// Import Routes controllers
import admin from "./routes/users";
import products from "./routes/products";

// Error handlers
import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";
// import errorHandlerMiddleware from "./config/errorHandler";

const app = express();

// Middlewares
app.use(cors());
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

//Redirecting page
app.get('/', (req, res) => {
    res.redirect('/api/products');
  });
  
// Routes
app.get('/', (req, res) => {
    res.redirect('/api/products');
  });
app.use("/api/users", admin);
app.use("/api/products", products);
app.use(notFound);
app.use(errorHandler);

export default app;

