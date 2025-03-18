import { Router } from "express";
import { createUser, getUserById, getUsers } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/user", createUser);
userRouter.get("/user", getUsers);
userRouter.get("/user/:id", getUserById);


export default userRouter;