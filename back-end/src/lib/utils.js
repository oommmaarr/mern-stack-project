import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateToken = (payload , res) => {
  const token =  jwt.sign(payload,process.env.JWT_SECRET,
    { expiresIn: "7d" });

    res.cookie("jwt" , token , {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    return token;
};


export default generateToken;