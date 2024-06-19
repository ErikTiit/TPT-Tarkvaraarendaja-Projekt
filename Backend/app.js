import { config } from 'dotenv';
config({ path: '../.env' });
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';
import companiesRoutes from './routes/companies.js';
import offersRoutes from './routes/offers.js';
import { authenticateJWT } from './middleware/AuthenticateJWT.js';
import cookieParser from 'cookie-parser';
import contractsRoutes from './routes/internshipContracts.js';
import { contractController } from './routes/contract.js';

const app = express();
app.use(cookieParser());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors({ credentials: true, origin: `${process.env.CORS_URL}` }));
app.use('/api/staff', userRoutes);
app.use('/api/student', userRoutes);
app.use('/api/contracts', contractsRoutes);
app.use('/api/user-login', userRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/contract', contractController);
app.use('/student-offers', authenticateJWT);
app.use('/check-auth', authenticateJWT, (req, res) => {
    res.sendStatus(200); // send OK status if authentication was successful
});
app.listen(process.env.PORTBACKEND, () => {
    console.log('server started on port:',process.env.PORTBACKEND);
});