import jwt from 'jsonwebtoken';


const secretKey = process.env.JWT_SECRET; 


function authenticateJWT(req, res, next) {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Authentication required. Please login.' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};

export { authenticateJWT };