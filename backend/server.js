import express from "express";
import "dotenv/config";
import connectDB from "./config/db.config.js";
import rootRoute from './routes/index.routes.js'

const app = express();
const port = process.env.PORT || 5000;


// middlewares
app.use('/api/v1', rootRoute) 



// DB connection
connectDB();
app.listen(port, () => console.log(`Server is running on port: ${port}`));
