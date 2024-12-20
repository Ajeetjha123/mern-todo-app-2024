import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authanticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "" + error.message });
  }
  next();
};
export default authanticate;
