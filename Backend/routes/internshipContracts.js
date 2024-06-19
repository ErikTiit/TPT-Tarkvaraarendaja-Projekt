import express from 'express';
import * as schema from '../database/schema.js';
import { eq } from "drizzle-orm";
import { db } from '../database/schema.js';

const contractsRoutes = express.Router();
contractsRoutes.use(express.json());

// GET ALL - CONTRACTS
contractsRoutes.get('/', async (req, res) => {
    try {
        const results = await db.select().from(schema.internshipContracts);
        if (results.length === 0) {
            res.status(404).send('No contracts found');
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(`Error fetching contracts `, err);
        res.status(500).send(`Error fetching contracts`);
    }
});

// GET BY ID - CONTRACT
contractsRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.select().from(schema.internshipContracts).where(eq(schema.internshipContracts.id, id));
        if (result.length === 0) {
            res.status(404).send('Contract not found');
        } else {
            res.json(result[0]);
        }
    } catch (err) {
        console.error(`Error fetching contract `, err);
        res.status(500).send(`Error fetching contract`);
    }
});

// POST - CONTRACT
contractsRoutes.post('/', async (req, res) => {
    
    const newContract = {
        user_id: req.body.user_id,
        offer_id: req.body.offer_id,
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    try {
        const result = await db.insert(schema.internshipContracts).values(newContract);
        res.status(201).json('Contract created');
    } catch (err) {
        console.error(`Error creating contract `, err);
        res.status(500).send(`Error creating contract`);
    }
});

contractsRoutes.get('/offer/:offerId', async (req, res) => {
    const { offerId } = req.params;
    try {
        const contracts = await db.select().from(schema.internshipContracts).where(eq(schema.internshipContracts.offer_id, offerId));
        if (contracts.length === 0) {
            res.status(404).send('No users found for this offer');
        } else {
            const users = [];
            for (const contract of contracts) {
                const user = await db.select().from(schema.users).where(eq(schema.users.id, contract.user_id));
                users.push(user[0]);
            }
            res.json(users);
        }
    } catch (err) {
        console.error(`Error fetching users for offer `, err);
        res.status(500).send(`Error fetching users for offer`);
    }
});

// PUT BY ID- CONTRACT
contractsRoutes.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedContract = req.body;
    try {
        const result = await db.update(schema.internshipContracts).set(updatedContract).where(eq(schema.internshipContracts.id, id));
        if (!result) {
            res.status(404).send('Contract not found');
        } else {
            res.json('Contract updated');
        }
    } catch (err) {
        console.error(`Error updating contract `, err);
        res.status(500).send(`Error updating contract`);
    }
});

// DELETE BY ID - CONTRACT
contractsRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.delete(schema.internshipContracts).where(eq(schema.internshipContracts.id, id));
        if (!result) {
            res.status(404).send('Contract not found');
        } else {
            res.json('Contract deleted');
        }
    } catch (err) {
        console.error(`Error deleting contract `, err);
        res.status(500).send(`Error deleting contract`);
    }
});

export default contractsRoutes;