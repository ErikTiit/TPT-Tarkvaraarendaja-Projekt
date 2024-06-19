import React from "react";
import { Formik, Form } from 'formik';
import "../../styles/BusinessView/JobIsValidStyle.css";
import { sendCompanyDataToAPI, sendOffersDataToAPI } from '../../Controllers/BusinessFormAPI.js';
import { TextInput, Flex, Card, Button, Input } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

const JobIsValid = () => {
    const handleBlur = (event) => {
        const { name, value } = event.target;
        localStorage.setItem(name, value);
    };

    const handleSubmit = async (values) => {
        try {

            const reqData = {
                'Company name': localStorage.getItem('comp_name'),
                'Register code': localStorage.getItem('comp_RegNo'),
                'Company email': localStorage.getItem('comp_email'),
                'Applicant position': localStorage.getItem('app_position'),
                'Field of Work': localStorage.getItem('job_workField'),
                'Job description': localStorage.getItem('job_description'),
                'Requirements for the candidate': localStorage.getItem('app_qualifications'),
                'Work location': localStorage.getItem('job_location'),
                'Term': localStorage.getItem('job_term'),
                'Job offer is valid until': localStorage.getItem('offer_exp_date'),
            };
            let errors = []
            for (let key in reqData) {
                if (!reqData[key]) {
                    errors.push(key);
                }
            }
            if (errors.length > 0) {
                let errorMsg = `Missing required fields: ${errors.join(', ')}`
                errors = [];
                throw new Error(`${errorMsg}`);

            }
            const companyData = {
                comp_id: Math.floor(Math.random() * 900 + 100), // generates a random 3-digit number as id
                name: reqData['Company name'],
                registryNo: reqData['Register code'],
                email: reqData['Company email'],
                password: "placeholder",
                phone_num: localStorage.getItem('comp_phone') || null,
            };

            const offersData = {
                comp_id: companyData.comp_id,
                comp_name: companyData.name,
                comp_email: companyData.email,
                comp_phone: companyData.phone_num,
                comp_RegNo: companyData.registryNo,
                app_position: reqData['Applicant position'],
                job_workField: reqData['Field of Work'],
                job_tags: localStorage.getItem('job_tags') || '',
                job_description: reqData['Job description'],
                app_qualifications: reqData['Requirements for the candidate'],
                job_location: reqData['Work location'],
                job_salary: localStorage.getItem('job_salary') || '',
                job_term: reqData['Term'],
                offer_exp_date: reqData['Job offer is valid until'],
            };
            console.log('offersData:', offersData);
            await sendCompanyDataToAPI(companyData);
            await sendOffersDataToAPI(offersData);
            // If no errors are thrown, display an alert window saying "Success"
            alert("Success");
            for (let key in offersData) {
                localStorage.removeItem(key); // Removes all the form related items from localstorage
            }
            window.location.href = "/student-offer" // redirect to the middle view
        } catch (error) {
            // Handle any errors that might occur during the submission process
            console.error("An error occurred:", error);
            alert(error.message);
        }
    };

    return (
        <Formik
            initialValues={{
                offer_exp_date: localStorage.getItem('offer_exp_date') || ''
            }}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, values }) => {
                const handleDateChange = (event) => {
                    handleChange(event); // update form state
                    localStorage.setItem('offer_exp_date', event.target.value); // store value in localStorage
                };

                return (
                    <Form>
                        <Card shadow="" padding="sm" radius="md" className="JobIsValidCard">
                            <Input.Wrapper label="Valid until" error="" style={{ marginBottom: "20px" }} required>
                                <Input
                                    type="date"
                                    className="CalendarInputArea"
                                    id="ValidUntil"
                                    name="offer_exp_date"
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleDateChange}
                                    value={values.offer_exp_date}
                                />
                            </Input.Wrapper>
                            <Flex gap={"10px"}>
                                <Button className="Job-Is_Valid-SaveDraft">Save Draft</Button>
                                <Button component="a" href="/index.html" className="Job-Is_Valid-Preview">Student view</Button>
                                <Flex>
                                    <Button type="submit" href="/student-offer" className="Job-Is_Valid-PublishJobOffer">Publish Job Offer</Button>
                                </Flex>
                            </Flex>
                        </Card>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default JobIsValid;
