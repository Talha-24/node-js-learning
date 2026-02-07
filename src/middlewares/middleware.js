import jwt from "jsonwebtoken";
import User from "../models/user.schema.js"; 

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "No Token Provided!" });
  }

  try {
    const secretKey = "SECRET"; 
    const decoded = jwt.verify(token, secretKey);

    const user = await User.findById(decoded.userId).select("-password"); 

    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exists in database" });
    }

    req.user = user; 
    
    next(); 
  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(403).json({ success: false, message: "Token expire ho gaya ya invalid hai." });
  }
}