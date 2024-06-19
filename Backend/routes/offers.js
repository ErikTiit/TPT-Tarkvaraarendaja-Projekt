import express from 'express';
import * as schema from '../database/schema.js';
import { eq } from "drizzle-orm";
import { db } from '../database/schema.js';

const offersRoutes = express.Router();
offersRoutes.use(express.json());

// GET ALL - OFFERS
offersRoutes.get('/', async (req, res) => {
    try {
        const results = await db.query.offers.findMany();
        if (results.length === 0) {
            res.status(404).send('No offers found');
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(`Error fetching offers `, err);
        res.status(500).send(`Error fetching offers`);
    }
});

// GET BY ID - OFFER
offersRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.select().from(schema.offers).where(eq(schema.offers.id, id));
        if (result.length === 0) {
            res.status(404).send('Offer not found');
        } else {
            res.json(result[0]);
        }
    } catch (err) {
        console.error(`Error fetching offer `, err);
        res.status(500).send(`Error fetching offer`);
    }
});

// POST - OFFER
offersRoutes.post('/', async (req, res) => {
    const newOffer = req.body;
    try {
        const result = await db.insert(schema.offers).values(newOffer);
        res.status(201).json('Offer created');
    } catch (err) {
        console.error(`Error creating offer `, err);
        res.status(500).send(`Error creating offer`);
    }
});

// PUT BY ID- OFFER
offersRoutes.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedOffer = req.body;
    try {
        const result = await db.update(schema.offers).set(updatedOffer).where(eq(schema.offers.id, id));
        if (!result) {
            res.status(404).send('Offer not found');
        } else {
            res.json('Offer updated');
        }
    } catch (err) {
        console.error(`Error updating offer `, err);
        res.status(500).send(`Error updating offer`);
    }
});

// DELETE BY ID - OFFER
offersRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.delete(schema.offers).where(eq(schema.offers.id, id));
        if (!result) {
            res.status(404).send('Offer not found');
        } else {
            res.json('Offer deleted');
        }
    } catch (err) {
        console.error(`Error deleting offer `, err);
        res.status(500).send(`Error deleting offer`);
    }
});

export default offersRoutes;