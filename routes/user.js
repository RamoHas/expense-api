import { Router } from "express";
import { getUserById, loginUser, registerUser, updateUser} from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/user/register", registerUser);
userRouter.post('/user/login', loginUser);
userRouter.patch('/user/:id', updateUser);
userRouter.get('/user/:id', getUserById);



export default userRouter;