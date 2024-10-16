import jwt from 'jsonwebtoken';

const verifyToken = (req: any, res: any, next: any) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('Token required.');

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
        if (err) return res.status(401).send('Invalid token.');
        req.companyId = (decoded as any).id;
        next();
    });
};

export default verifyToken;
