import {Router} from "express"
import { backgroundRemove, deleteImage, getImage } from "../controllers/removeBg.js"
import upload from "../middlewares/multerMiddleware.js"
import { verifyToken } from "../middlewares/jwtMiddleware.js"

const imageRouter = Router()

imageRouter.post("/rm-bg", upload.single("image") ,backgroundRemove )
imageRouter.get("/data/:id", getImage)
imageRouter.delete("/delete/:id", deleteImage)

export default imageRouter