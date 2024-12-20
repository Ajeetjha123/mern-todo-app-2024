import genrateTokenAndSaveCookie from "../jwt/genrateTokenAndSaveCookie.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
const registerUser = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    genrateTokenAndSaveCookie(savedUser._id, res);
    res.status(201).json({
      message: "User registered successfully",
      user: { fullName: savedUser.fullName, email: savedUser.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = await genrateTokenAndSaveCookie(user._id, res);
    res.status(200).json({
      message: "User logged in successfully",
      user: { fullName: user.fullName, email: user.email },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in user" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
      httpOnly: true, // Make sure it's only accessible via HTTP requests
      // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent the cookie from being sent with cross-site requests
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging out user" });
  }
};

export { registerUser, loginUser, logoutUser };
