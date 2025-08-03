import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;

        if (!dtoken) {
            return res.status(401).json({ success: false, message: 'Not Authorized to Login' });
        }

        const tokenDecode = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.user = { id: tokenDecode.id }; // ✅ standard way

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: error.message });
    }
};

export default authDoctor;
