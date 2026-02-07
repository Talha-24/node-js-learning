import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
   host: 'smtp.ethereal.email',
    port: 587,
  auth: {
    user: "gregg44@ethereal.email", 
    pass: "y5NE6js51S1zU9Su2h", // NOT your login password, see note below
  },
});

export default transporter;