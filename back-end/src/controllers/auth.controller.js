import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../lib/utils.js";
export const registerController = async (req, res) => {
  try {
    const { password, fullname } = req.body;
    let email = req.body.email?.toLowerCase();
    if (!email || !password || !fullname) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      fullname,
    });
    await newUser.save();
    generateToken({ id: newUser._id, role: newUser.role }, res);
    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        email: newUser.email,
        fullname: newUser.fullname,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const normalizeEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizeEmail });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    generateToken({ id: user._id, role: user.role }, res);
    res.status(200).json({
      message: "Login successful.",
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
    });

    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const checkAuthController = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Check Auth Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const promotetoAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No User With That Email" });
    }
    if (user.role === "admin") {
      return res
        .status(400)
        .json({ message: "This user is already an Admin." });
    }
    user.role = "admin";
    await user.save();
    generateToken({ id: user._id, role: user.role }, res);
    res.status(200).json({
      message: "User promoted to Admin successfully",
      user: {
        email: user.email,
        fullname: user.fullname,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
