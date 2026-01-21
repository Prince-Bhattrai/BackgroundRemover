import {Router} from "express"
import { logIn, signUp, verifyUser } from "../controllers/userController.js"
import { verifyToken } from "../middlewares/jwtMiddleware.js"

const userRouter = Router()


userRouter.post("/sign-up", signUp )
userRouter.post("/log-in", logIn)
userRouter.get("/verify", verifyToken, verifyUser)

export default userRouter