import express from 'express';
import * as schema from '../database/schema.js';
import { eq } from "drizzle-orm";
import { db } from '../database/schema.js';
import bcrypt from 'bcrypt';
import { issueJWT } from '../middleware/IssueJWT.js';
import jwt from 'jsonwebtoken';


const secretKey = process.env.JWT_SECRET; 

const userRoutes = express.Router();
userRoutes.use(express.json());

// GET ALL - USERS BY ROLE
userRoutes.get('/', async (req, res) => {
    const role = req.baseUrl.split('/')[2]; // either /student or /staff'
    try {
        const results = await db.query.users.findMany({ where: eq(schema.users.role, role) });
        if (results.length === 0) {
            res.status(404).send(`No ${role} members found`);
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(`Error fetching ${role} members `, err);
        res.status(500).send(`Error fetching ${role} members`);
    }
});

// GET BY ID - USER
userRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.select().from(schema.users).where(eq(schema.users.id, id));
        if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.json(result);
        }
    } catch (err) {
        console.error(`Error fetching user `, err);
        res.status(500).send(`Error fetching user`);
    }
});
// POST - USER
userRoutes.post('/', async (req, res) => {
    const newUser = req.body;
    const role = req.baseUrl.split('/')[2]; // either 'student' or 'staff'

    // If no role is provided in the request body, assign the role based on the URL
    newUser.role = newUser.role || role;
    if (newUser.role !== role) {
        res.status(400).send(`Cannot create a ${newUser.role} from the /${role} endpoint`);
        return;
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    try {
        const result = await db.insert(schema.users).values(newUser);

        // Issue a JWT
        const token = issueJWT(newUser);

        

        // Set the JWT as a cookie
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });

        res.status(201).json('User created');
    } catch (err) {
        console.error(`Error creating user `, err);
        res.status(500).send(`Error creating user`);
    }
});


// POST - STAFF LOGIN
/*userRoutes.post('/staff-login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.select().from(schema.user).where(eq(schema.users.email, email), eq(schema.users.role, 'staff'));

        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = result[0];

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log(`User authenticated: ${JSON.stringify(user)}`);

        // Issue a JWT token
        const token = issueJWT(user);

        console.log(`Issued token: ${token}`);

        // Saves JWT token in a cookie
        res.cookie('jwt', token, { httpOnly: true });

        res.json({ message: 'Login successful' });
    } catch (err) {
        console.log(`Error in login route handler: ${err}`);
        res.status(500).json({ message: 'Error logging in' });
    }
});
*/

// POST - STUDENT LOGIN
userRoutes.post('/user-login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.select().from(schema.users).where(eq(schema.users.email, email));

        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = result[0];

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        

        // Issue a JWT token
        const token = issueJWT(user);

        

        // Verify the token
        jwt.verify(token, secretKey, (err) => {
            if (err) {
                console.log(`Error verifying token: ${err}`);
            } else {
                return
            }
        });

        // Saves JWT token in a cookie
        res.cookie('jwt', token, { httpOnly: true });

        // Include the user_id and email in the response
        res.json({ message: 'Login successful', user_id: user.id, email: user.email});
    } catch (err) {
        console.log(`Error in login route handler: ${err}`);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// GET - CHECK AUTH
userRoutes.get('/check-auth', (req, res) => {
    // get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // if there isn't any token
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        res.sendStatus(200); // if token is valid, return OK status
    });
});

// PUT - USER
userRoutes.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    // If password is being updated, hash the new password
    if (updatedUser.password) {
        const hashedPassword = await bcrypt.hash(schema.users.password, 10);
        updatedUser.password = hashedPassword;
    }

    try {
        const result = await db.update(schema.users).set(updatedUser).where(eq(schema.users.id, id));
        if (!result) {
            res.status(404).send('User not found');
        } else {
            res.json('User updated');
        }
    } catch (err) {
        console.error(`Error updating user `, err);
        res.status(500).send(`Error updating user`);
    }
});

// DELETE BY ID- USER
userRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.delete(schema.users).where(eq(schema.users.id, id));
        if (!result) {
            res.status(404).send('User not found');
        } else {
            res.json('User deleted');
        }
    } catch (err) {
        console.error(`Error deleting user `, err);
        res.status(500).send(`Error deleting user`);
    }
});

export default userRoutes;