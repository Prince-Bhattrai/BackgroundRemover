import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { name, email, password, isGoogle } = req.body;

  if (isGoogle === undefined) {
    return res.status(400).json({
      success: false,
      message: "isGoogle flag is required",
    });
  }

  try {
    let user = await userModel.findOne({ email });

    if (isGoogle === false) {
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      if (user) {
        return res.status(409).json({
          success: false,
          message: "User already exists",
          user
        });
      }

      const hash = await bcrypt.hash(password, 10);
      user = await userModel.create({ name, email, password: hash });
      

    }

    if (isGoogle === true) {
      if (!email || !name) {
        return res.status(400).json({
          success: false,
          message: "Email and name required",
        });
      }

      if (!user) {
        user = await userModel.create({ name, email });
      }
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      success: true,
      message: "User authenticated successfully",
      token,
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const logIn = async (req, res) => {
  const { email, password, isGoogle } = req.body;

  if (isGoogle === undefined) {
    return res.status(400).json({
      success: false,
      message: "isGoogle flag is required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (isGoogle === false) {
      if (!password) {
        return res.status(400).json({
          success: false,
          message: "Password required",
        });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
    }


    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const verifyUser = async(req, res)=>{
  try {
     return res.status(200).json({
      success:true,
      message:"User verify"
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"server error please try again later."
    })
  }
}