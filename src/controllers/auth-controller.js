import dotenv from "dotenv"
dotenv.config();
import transporter from "../../utility/mailer.js";
import User from "../models/user.schema.js";
import crypto from "crypto";
import jwt from "jsonwebtoken"

export const createUserAccount = async (req, res) => {
 const token=req.headers["Authorization"];

 
 



  const { name, email, phone,password } = req.body;

  const isEmailPresent = await User.findOne({email,});

  if (isEmailPresent) {
    return res.json({
      success: true,
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
          <strong> <a href="${process.env.FRONT_END_URL}?token=${manualToken}"> ${process.env.FRONT_END_URL}?token=${manualToken} </a></strong>
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