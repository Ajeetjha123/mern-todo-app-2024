import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const genrateTokenAndSaveCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    //maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
  await User.findByIdAndUpdate(userId, { token });
  return token;
};
export default genrateTokenAndSaveCookie;
