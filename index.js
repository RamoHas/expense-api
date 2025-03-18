import express from "express";
import userRouter from "./routes/user.js";
import expenseRouter from "./routes/expense.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);


//Create an express app
const app = express();

// Use global middlewares
app.use(express.json());
app.use(expenseRouter);
app.use(userRouter);

// Listen for incoming request
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
