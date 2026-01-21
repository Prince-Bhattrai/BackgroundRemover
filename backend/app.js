import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import imageRouter from "./routes/imageRoutes.js"
import userRouter from "./routes/userRoutes.js"

dotenv.config()

const app = express()

//Middlewares
app.use(cors())
app.use(express.json())

app.use("/v1/api/image",  imageRouter)
app.use("/v1/api/user", userRouter)




export default app