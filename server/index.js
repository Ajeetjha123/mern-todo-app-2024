import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
const port = process.env.PORT || 4001;

//mongodb conneciton
connectDB();

//routes
app.use("/api/v1/todo", todoRoute);

app.use("/api/v1/user", userRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
