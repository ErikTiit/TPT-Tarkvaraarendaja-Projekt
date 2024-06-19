import express from 'express';
import * as schema from '../database/schema.js';
import { eq } from "drizzle-orm";
import { db } from '../database/schema.js';
import { createAccountBusiness } from '../middleware/CreateAccountBusiness.js';

const companiesRoutes = express.Router();
companiesRoutes.use(express.json());

// GET ALL - COMPANIES
companiesRoutes.get('/', async (req, res) => {
    try {
        const results = await db.query.companies.findMany();
        if (results.length === 0) {
            res.status(404).send('No companies found');
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(`Error fetching companies `, err);
        res.status(500).send(`Error fetching companies`);
    }
});
// GET BY RegNo - COMPANIES
companiesRoutes.get('/reg/:RegNo', async (req, res) => {
    const { RegNo } = req.params;
    try {
        const results = await db.select().from(schema.companies).where(eq(schema.companies.registryNo, RegNo));
           
        if (results.length > 0) {
            res.status(201).send('Company already exists');
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(`Error fetching companies `, err);
        res.status(500).send(`Error fetching companies`);
    }
});
// GET BY email - COMPANIES
companiesRoutes.get('/email/:compEmail', async (req, res) => {
    const { compEmail } = req.params;
    try {
        const results = await db.select().from(schema.companies).where(eq(schema.companies.email, compEmail));
           
        if (results.length > 0) {
            res.status(201).send('Company already exists');
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(`Error fetching companies `, err);
        res.status(500).send(`Error fetching companies`);
    }
});
// GET BY name - COMPANIES
companiesRoutes.get('/name/:compName', async (req, res) => {
    const { compName } = req.params;
    try {
        const results = await db.select().from(schema.companies).where(eq(schema.companies.name, compName));
           
        if (results.length > 0) {
            res.status(201).send('Company already exists');
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(`Error fetching companies `, err);
        res.status(500).send(`Error fetching companies`);
    }
});


// GET BY ID - COMPANY
companiesRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.select().from(schema.companies).where(eq(schema.companies.comp_id, id));
        if (result.length === 0) {
            res.status(404).send('Company not found');
        } else {
            res.json(result[0]);
        }
    } catch (err) {
        console.error(`Error fetching company `, err);
        res.status(500).send(`Error fetching company`);
    }
});

// POST - COMPANY
companiesRoutes.post('/', async (req, res) => {
    const newCompany = req.body;
    try {
        const result = await db.insert(schema.companies).values(newCompany);
        const companyData = {
            name: newCompany.name,
            email: newCompany.email,
            password: newCompany.password,
            course: 'COMP',
            role: 'student'
        };
        await createAccountBusiness({ body: companyData }, res);  // Create a user for the new company
        res.status(201).json('Company created');
    } catch (err) {
        console.error(`Error creating company `, err);
        res.status(500).send(`Error creating company`);
    }
});

// PUT BY ID- COMPANY
companiesRoutes.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCompany = req.body;
    try {
        const result = await db.update(schema.companies).set(updatedCompany).where(eq(schema.companies.comp_id, id));
        if (!result) {
            res.status(404).send('Company not found');
        } else {
            res.json('Company updated');
        }
    } catch (err) {
        console.error(`Error updating company `, err);
        res.status(500).send(`Error updating company`);
    }
});

// DELETE - COMPANY
companiesRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.delete(schema.companies).where(eq(schema.companies.comp_id, id));
        if (!result) {
            res.status(404).send('Company not found');
        } else {
            res.json('Company deleted');
        }
    } catch (err) {
        console.error(`Error deleting company `, err);
        res.status(500).send(`Error deleting company`);
    }
});

export default companiesRoutes;