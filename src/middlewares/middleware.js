import jwt from "jsonwebtoken";

export async function authMiddleware(req,res){


const token = req.headers['Authorization'];
const secretKey = "SECRET"; // Wahi key jo token banate waqt use ki thi

try {
  // Yeh function check karega ke token genuine hai aur use decode karega
  const decoded = jwt.verify(token, secretKey);
  
  
  console.log("Decoded User ID:", decoded.userId);
  console.log("Decoded Email:", decoded.email);
} catch (err) {
  // Agar token expired hai ya galat hai toh error yahan aayega
  console.error("Token verification failed:", err.message);
}
}