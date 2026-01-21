import mongoose from "mongoose";
import app from "../app.js";

mongoose.connect(process.env.DB).then(()=>{
    console.log("Database connect successfully!")
    app.listen(process.env.PORT, ()=>{
        console.log("App is running on -> ", process.env.PORT)
    })
})
.catch((err)=>{
    console.log(err)
})