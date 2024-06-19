import jwt from 'jsonwebtoken';


const secretKey = process.env.JWT_SECRET; 

// Function to issue a JWT
function issueJWT(user) {
    const payload = {
        user: {
            id: user.id,
            email: user.email
        },
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });


    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(`Error verifying token: ${err}`);
        } else {
            return
        }
    });

    return token;
};

export { issueJWT };