import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { sendOTPEmail } from '../services/emailService';

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const register = async (req: any, res: any) => {
    const { name, phone, companyName, companyEmail, employeeSize } = req.body;

    if (!name || !phone || !companyName || !companyEmail || !employeeSize) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    try {
      const company = await prisma.company.create({
        data: {
          name,
          phone,
          companyName,
          companyEmail,
          employeeSize: Number(employeeSize),
          otp,
          otpExpires
        }
      });

      await sendOTPEmail(companyEmail, otp);

      const token = jwt.sign({ id: company.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      res.cookie('token', token);

      res.status(201).json({
        message: 'Company registered. Please check your email for the OTP to verify your account.',
        token,
        id: company.id,
        email: companyEmail
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Email already exists' });
      } else {
        res.status(500).json({ error: 'Registration failed. Please try again.' });
      }
    }
};

export const login = async (req: any, res: any) => {
    const { email } = req.body;
    const company = await prisma.company.findUnique({ where: { companyEmail: email } });

    if (!company) {
        return res.status(404).json({ message: 'Company not found' });
    }

    if (!company.verified) {
        return res.status(403).json({ message: 'Email not verified' });
    }

    const token = jwt.sign({ id: company.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
};

export const verifyEmail = async (req: any, res: any) => {
    const { email, otp } = req.body;

    try {
        const company = await prisma.company.findFirst({
            where: {
                companyEmail: email,
                otp: otp,
                otpExpires: { gt: new Date() }
            }
        });

        if (!company) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        await prisma.company.update({
            where: { id: company.id },
            data: {
                verified: true,
                otp: null,
                otpExpires: null
            }
        });

        const token = jwt.sign({ id: company.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        res.json({ message: 'Email verified successfully. You can now log in.', token });
    } catch (error) {
        res.status(400).json({ error: 'Verification failed' });
    }
};

export const LogOut = async (req: any, res: any) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
}
