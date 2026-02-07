import dotenv from "dotenv"
dotenv.config();
import transporter from "../../utility/mailer.js";
import User from "../models/user.schema.js";
import crypto from "crypto";
import jwt from "jsonwebtoken"

export const createUserAccount = async (req, res) => {


  const { name, email, phone,password } = req.body;

  const isEmailPresent = await User.findOne({email,});

  if (isEmailPresent) {
    return res.json({
      success: false,
      message: "Email already exists",
    });
  }


     const new_user = await User.create({
      name,
      email,
      phone,
      password,
      is_token_valid:false,
    });



  // 3. GENERATE MANUAL TOKEN 

    // We combine the new User ID and Email with a secret key
    const secret = "SECRET";
    const manualToken = crypto
      .createHmac("sha256", secret)
      .update(`${new_user._id}${new_user.email}`)
      .digest("hex"); 
    // 4. Update the user with the generated token


       new_user.token = manualToken;
        await new_user.save();



        const mailOptions = {
      from: '"Your App Name"',
      to: email,
      subject: "Verify Your Account",
      html: `
        <h1>Welcome ${name}!</h1>
        <p>Thank you for registering. Please use the token below to verify your account:</p>
        <div style="background: #f4f4f4; padding: 10px; border: 1px solid #ddd;">
          <strong> <a href="${process.env.FRONT_END_URL}/email-verification?token=${manualToken}"> ${process.env.FRONT_END_URL}?email-verification?token=${manualToken} </a></strong>
        </div>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);




    return res.status(201).json({
      success: true,
      message: "Account is created successfully",
    });


};








export const emailVerification=async(req,res)=>{
  const {token}=req.body;
  
  if(!token){
    return res.json({status:500,success:false,message: "Missing token  "})
  }

  // Search for the user 

  const isValidUser=await User.findOne({token})
  // Checking token expiry

  if(!isValidUser){
    return res.json({status:400,message: "Invalid or expired token"})
  }

  if(isValidUser?.is_token_valid){
    return res.json({status:400,message: "Token is expired"})
  }



  if(isValidUser){
    isValidUser.is_token_valid=true;
    isValidUser.save();
  }

  const jwtSecret="SECRET";

     const accessToken = jwt.sign(
      { 
        userId: isValidUser._id, 
        email: isValidUser.email 
      }, 
      jwtSecret, 
      // { expiresIn: "7d" } 
    );

  return res.json({success:true,message: "Email is Verified Successfully",accessToken})
  // Email Verified






}













export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials (Wrong Password)" });
    }

    const secretKey = "SECRET"; 
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      secretKey,
      { expiresIn: "24h" } 
    );

    // 6. Success Response
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      accessToken: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error during login" });
  }
};