import { config } from 'dotenv';
config({ path: '../.env' });
import { int, mysqlTable, bigint, varchar, date, datetime, mysqlEnum } from 'drizzle-orm/mysql-core';
import { drizzle } from "drizzle-orm/mysql2";
import { foreignKey, primaryKey} from 'drizzle-orm/pg-core';
import mysql from "mysql2/promise";


//Creating tables in schema
//Users table
export const users = mysqlTable('users', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 90 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  course: varchar('course', { length: 10 }).notNull(),
  role: mysqlEnum('role', ['staff', 'student','admin','company']).notNull(),
});
//Companies table
export const companies = mysqlTable('companies', {
  comp_id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  registryNo: int('companyRegNo', { length: 256 }).notNull().unique(),
  name: varchar('companyName', { length: 256 }).notNull().unique(),
  email: varchar('companyEmail', { length: 90 }).notNull(),
  password: varchar('companyPassword', { length: 256 }).notNull(),
  phone_num: int('companyPhone', { length: 256 }),
}, (table) => {
  return {
    pk: primaryKey(table.name, table.email, table.phone_num)
  }
})
//Offers table
export const offers = mysqlTable('offers', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  comp_id: bigint('comp_id', { mode: 'number' }).references(() => companies.comp_id),
  comp_name: varchar('comp_name', { length: 256 }).notNull(),
  comp_email: varchar('comp_email', { length: 90 }).notNull(),
  comp_phone: varchar('comp_phone', { length: 256 }),
  comp_RegNo: int('comp_RegNo', { length: 256 }).notNull(),
  app_position: varchar('applicant_position', { length: 256 }).notNull(),
  job_workField: varchar('job_workField', { length: 256 }).notNull(),
  job_tags: varchar('job_tags', { length: 256 }),
  job_description: varchar('job_description', { length: 256 }).notNull(),
  app_qualifications: varchar('applicant_qualifications', { length: 256 }).notNull(),
  job_location: varchar('job_location', { length: 256 }),
  job_salary: varchar('job_salary', { length: 256 }),
  job_term: varchar('job_term', { length: 256 }),
  offer_exp_date: date('offer_expiry_date', { length: 256 })
}, (table) => {
  return {
    companyReference: foreignKey({
      columns: [table.comp_name, table.comp_email, table.comp_phone],
      foreignColumns: [companies.name, companies.email, companies.phone_num]
    })
  }
})

// Internship Contracts table
export const internshipContracts = mysqlTable('internshipContracts', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  offer_id: bigint('offer_id', { mode: 'number' }).references(() => offers.id).notNull(),
  user_id: bigint('user_id', { mode: 'number' }).references(() => users.id).notNull(),
  created_at: date('created_at').notNull(),
  accepted_at: date('accepted_at'),
  rejected_at: date('rejected_at'),
  response: varchar('companyResponse', { length: 1024 }), 
}, (table) => {
  return {
    offerReference: foreignKey({
      columns: [table.offer_id],
      foreignColumns: [offers.id]
    }),
    userReference: foreignKey({
      columns: [table.user_id],
      foreignColumns: [users.id]
    })
  }
})

export const students = mysqlTable('students', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', {length: 256 }).notNull(),
  group: varchar('group', {length: 256 }).notNull()
});

export const studentGrades = mysqlTable('studentGrades', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  student_id: bigint('student_id', {mode: 'number' }).references(() => students.id).notNull(),
  lesson: varchar('lesson', {length: 256 }).notNull(),
  teacher: varchar('teacher', {length: 256 }).notNull(),
  grade: varchar('grade', {length: 256 }).notNull()
});



const poolConnection =  mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

// create-contract table
export const contract = mysqlTable('contract', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    companySigner: varchar('company_signer_name', { length: 256 }),
    companyName: varchar('company_name', { length: 256 }),
    companyRegisterCode: varchar('company_register_code', { length: 256 }),
    companyAddress: varchar('company_address', { length: 256 }),
    companyPhone: varchar('company_phone', { length: 256 }),
    companyEmail: varchar('company_email', { length: 256 }),
    companyInstructor: varchar('company_instructor', { length: 256 }),
    companyInstructorPhone: varchar('company_instructor_phone', { length: 256 }),
    companyInstructorEmail: varchar('company_instructor_email', { length: 256 }),
    studentName: varchar('student_name', { length: 256 }),
    studentPIN: varchar('student_pin', { length: 256}),
    studentAddress: varchar('student_address', { length: 256 }),
    studentPhone: varchar('student_phone', { length: 256 }),
    studentEmail: varchar('student_email', { length: 256 }),
    validFrom: date('valid_from', { length: 256 }),
    expirationDate: date('expiration_date', { length: 256 }),
    creationDate: datetime('creation_date', { length: 256 }),
    schoolSigner: varchar('school_signer', { length: 256 }),
    schoolSignerPhone: varchar('school_signer_phone', { length: 256 }),
    schoolInstructor: varchar('school_instructor', { length: 256 }),
    schoolInstructorEmail: varchar('school_instructor_email', { length: 256 }),
    schoolInstructorPhone: varchar('school_instructor_phone', { length: 256 }),
});

export const db = drizzle(poolConnection, { schema: { users, companies, offers, students }, mode: "default" });