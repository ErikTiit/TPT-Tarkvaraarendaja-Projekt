import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config({ path: '../.env' });

const pool =  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
  });

const seedStaff = async () => {
    try {
        const conn = await pool.getConnection();
        await conn.query('INSERT INTO staff (name, email, password, course) VALUES (?, ?, ?, ?)', ['John Doe', 'john.doe@example.com', 'password123', 'MM32']);
        await conn.query('INSERT INTO staff (name, email, password, course) VALUES (?, ?, ?, ?)', ['Jane Smith', 'jane.smith@example.com', 'password456', 'TA23']);
        await conn.query('INSERT INTO staff (name, email, password, course) VALUES (?, ?, ?, ?)', ['Bob Johnson', 'bob.johnson@example.com', 'password789', 'IT21']);
        await conn.query('INSERT INTO staff (name, email, password, course) VALUES (?, ?, ?, ?)', ['admin', 'admin@admin.com', 'admin', 'lol']);
        conn.release();
        console.log('Staff seeded successfully');
    } catch (err) {
        console.error('Error seeding staff: ', err);
    }
};

const seedStudent = async () => {
    try {
        const conn = await pool.getConnection();
        await conn.query('INSERT INTO student (name, email, password, course) VALUES (?, ?, ?, ?)', ['Alice Brown', 'alice.brown@example.com', 'password123', 'TA23']);
        await conn.query('INSERT INTO student (name, email, password, course) VALUES (?, ?, ?, ?)', ['Tom Wilson', 'tom.wilson@example.com', 'password456', 'PP32']);
        await conn.query('INSERT INTO student (name, email, password, course) VALUES (?, ?, ?, ?)', ['Sara Lee', 'sara.lee@example.com', 'password789', 'MA23']);
        conn.release();
        console.log('Students seeded successfully');
    } catch (err) {
        console.error('Error seeding students: ', err);
    }
};




(async () => {
    await seedStaff();
    await seedStudent();
    
    process.exit();
})();