import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mattie36@ethereal.email',
        pass: 'DU6PZjBdaPgvCPSfP3'
    }
});

export default transporter;