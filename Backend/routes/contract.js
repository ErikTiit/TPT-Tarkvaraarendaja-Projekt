import fs from 'fs';
import { Router } from 'express'
import * as schema from '../database/schema.js';
import { eq } from "drizzle-orm";
import { contract, db } from '../database/schema.js';
import puppeteer from 'puppeteer';

const router = Router()

const allowedFields = [
    'companySigner',
    'companyName',
    'companyRegisterCode',
    'companyAddress',
    'companyPhone',
    'companyEmail',
    'companyInstructor',
    'companyInstructorPhone',
    'companyInstructorEmail',
    'studentName',
    'studentPIN',
    'studentAddress',
    'studentPhone',
    'studentEmail',
    'validFrom',
    'expirationDate',
    'creationDate',
    'schoolSigner',
    'schoolSignerPhone',
    'schoolInstructor',
    'schoolInstructorEmail',
    'schoolInstructorPhone',
]

router.get('/', async (req, res) => {
    try {
        const results = await db.select().from(schema.contract);
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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.select().from(schema.contract).where(eq(schema.contract.id, id));
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

router.get('/:id/pdf', async (req, res) => {
    try {
        const contracts = await db.select().from(contract).where(eq(contract.id, req.params.id));
        if (contracts.length === 0) {
            return res.status(404).send('Contract not found');
        }
        const contractData = contracts[0];
        console.log(contractData);
        const fileData = await fs.promises.readFile('./ContractTemplate.html', 'utf8');
        let result = fileData;
        contractData.validFrom = contractData.validFrom.toISOString().split('T')[0];
        contractData.expirationDate = contractData.expirationDate.toISOString().split('T')[0];
        contractData.creationDate = contractData.creationDate.toISOString().split('T')[0];
        for (let key in contractData) {
            result = result.replace(new RegExp(`{{${key}}}`, 'g'), contractData[key]);
        }
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(result);
        const pdf = await page.pdf({ format: 'A4' });
        res.setHeader('Content-Disposition', 'attachment; filename=contract.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf);
        await browser.close();  
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
}); 

router.post('/', async (req, res) => {
    let fields = {}
    let errors = {}

    for (let fieldName of allowedFields) {
        if (req.body[fieldName] !== undefined) {
            fields[fieldName] = req.body[fieldName]
        } else {
            errors[fieldName] = "This field is required"
        }
    }

    ['validFrom', 'expirationDate', 'creationDate'].forEach(dateField => {
        if (fields[dateField]) {
            fields[dateField] = new Date(fields[dateField])
            if (isNaN(fields[dateField])) {
                errors[dateField] = "Invalid date"
            }
        } else {
            errors[dateField] = "This field is required"
        }
    })

    if (Object.keys(errors).length) {
        res.status(400).json(errors)
        return;
    }

    console.log(fields) // temporary
    let result = await db.insert(contract).values(fields); // "let result =" temporary
    res.send(result) // or res.send('Saved')
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    let updatedContract = { ...req.body };

    // Convert date strings to Date objects for specific fields
    const dateFields = ['validFrom', 'expirationDate', 'creationDate'];
    dateFields.forEach(field => {
        if (updatedContract[field]) {
            updatedContract[field] = new Date(updatedContract[field]);
        }
    });

    try {
        const result = await db.update(schema.contract).set(updatedContract).where(eq(schema.contract.id, id));
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

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.delete(schema.contract).where(eq(schema.contract.id, id));
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

export const contractController = router;