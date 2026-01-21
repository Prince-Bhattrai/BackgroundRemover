import axios from "axios";
import FormData from "form-data";
import imageModel from "../models/imageModel.js";
// import { v2 as cloudinary } from "cloudinary";
import cloudinary from "../auth/cloudinaryAuth.js";

export const backgroundRemove = async (req, res) => {
  try {
    const image = req.file;
    const id = req.body.id;
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const form = new FormData();
    form.append("image", image.buffer, {
      filename: image.originalname,
      contentType: image.mimetype,
    });

    const response = await axios.post(
      process.env.MODEL_URL,
      form,
      {
        headers: form.getHeaders(),
        responseType: "arraybuffer",
      }
    );

    const uploadedImage = await cloudinary.uploader.upload(
      `data:image/png;base64,${Buffer.from(response.data).toString("base64")}`,
      { folder: "BGRemove" }
    );

    const savedImage = await imageModel.create({
      image: uploadedImage.secure_url,
      user: id,
    });

    res.status(200).json({
      success: true,
      message: "Background removed successfully!",
      image: savedImage,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error, try again later!",
    });
  }
};


export const getImage = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({
      success: false,
      message: "Id is required"
    })
  }
  try {
    const data = await imageModel.find({ user: id })
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "date not found"
      })
    }
    res.status(200).json({
      success: true,
      message: "All data",
      data
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      messageL: "Server error please try again later!"
    })
  }

}



export const deleteImage = async (req, res) => {
  const {id}  = req.params;
  console.log("Id from api is", id)
  if (!id) {
    return res.status(401).json({
      success: false,
      message: "Id is required"
    })
  }
  try {
    const deletedData = await imageModel.findByIdAndDelete( id )
    if (!deletedData) {
      return res.status(401).json({
        success: false,
        message: "No data found"
      })
    }
    res.status(200).json({
      success: true,
      message: "Deleted successfully!",
      deletedData
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Server error please try again later."
    })
  }
}