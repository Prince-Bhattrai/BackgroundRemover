import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})


const imageModel = mongoose.model("imageModel", imageSchema)
export default imageModel