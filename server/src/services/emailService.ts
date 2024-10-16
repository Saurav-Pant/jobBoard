import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD
const EMAIL_FROM = process.env.EMAIL_FROM

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD,
    }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        await transporter.sendMail({
            from: `"Job Board" <${EMAIL_FROM}>`,
            to,
            subject,
            html
        });
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};

export async function sendOTPEmail(email: string, otp: string) {
    const mailOptions = {
        from: `"Job Board" <${EMAIL_FROM}>`,
        to: email,
        subject: "Your OTP for Email Verification",
        text: `Your OTP for email verification is: ${otp}. This OTP will expire in 15 minutes.`,
        html: `
            <h1>Welcome to Job Board!</h1>
            <p>Your One-Time Password (OTP) for email verification is:</p>
            <h2 style="font-size: 24px; background-color: #f0f0f0; padding: 10px; display: inline-block;">${otp}</h2>
            <p>This OTP will expire in 15 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('OTP email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
}
