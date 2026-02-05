import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
   host: 'smtp.ethereal.email',
    port: 587,
  auth: {
    user: "marianna.mcclure@ethereal.email", 
    pass: "vNbPtd2j6dUK4kyN37", // NOT your login password, see note below
  },
});

export default transporter;