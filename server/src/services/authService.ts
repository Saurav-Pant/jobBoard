import jwt from 'jsonwebtoken';

export const createToken = (payload: object): string => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
        throw new Error('Invalid token');
    }
};
