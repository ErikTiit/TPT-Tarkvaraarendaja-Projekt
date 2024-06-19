import React from "react";
import { Formik, Form } from 'formik';
import "../../styles/BusinessView/CompanyInfoInputStyle.css"
import axios from "axios";
import { TextInput, Flex, Card, NumberInput } from '@mantine/core';

const validateEmail = async email => {
    let message = '';
    if (!email) {
        return 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ) {
        return 'Invalid email address';
    } else {
        try {
            const response = await axios.get(`${import.meta.env.VITE_COMPANIESEMAILAPI}${email}`);
            if (Array.isArray(response.data) && response.data.length === 0) {
                message = '';
            } else {
                message = 'Company with this email already exists';
                window.alert(message); // Display an alert box with the response
            }
        } catch (err) {
            console.error(err);
            window.alert('Error occurred while validating email'); // Display an alert box with the error message
        }
        if (message == "Company with this email already exists") {
            return 'Company exists';
        } else {
            console.log(message)
            return '';
        }
    }
};


const validatePhone = phone => {
    if (phone && phone.length < 8) {
        return 'Must be 8 characters';
    }
    return '';
};

const validateName = async (name) => {
    let message = '';
    if (!name) {
        return 'Required';
    } else {
        try {
            const response = await axios.get(`${import.meta.env.VITE_COMPANIESNAMEAPI}${name}`);
            if (Array.isArray(response.data) && response.data.length === 0) {
                message = '';
            } else {
                message = 'Company with this name already exists';
                window.alert(message); // Display an alert box with the response
            }
        } catch (err) {
            console.error(err);
            window.alert('Error occurred while validating name'); // Display an alert box with the error message
        }
        if (message == "Company with this name already exists") {
            return 'Company exists';
        } else {
            console.log(message)
            return '';
        }
    }
};


const validateReg = async (RegNo) => {
    let message = '';
    if (!RegNo || RegNo.length < 8) {
        return 'Must be 8 characters';
    } else {
        try {
            const response = await axios.get(`${import.meta.env.VITE_COMPANIESREGAPI}${RegNo}`);
            if (Array.isArray(response.data) && response.data.length === 0) {
                message = '';
            } else {
                message = 'Company with this registration number already exists';
                window.alert(message); // Display an alert box with the response
            }
        } catch (err) {
            console.error(err);
            window.alert('Error occurred while validating registration number'); // Display an alert box with the error message
        }
        if (message == "Company with this registration number already exists") {
            return 'Company exists';
        } else {
            console.log(message)
            return '';
        }
    }
};
console.log(import.meta.env.VITE_COMPANIESREGAPI)
console.log(import.meta.env.VITE_COMPANIESNAMEAPI)
console.log(import.meta.env.VITE_COMPANIESEMAILAPI)
const CompanyInfoInput = () => {
    const handleBlur = async (event) => {
        const { name, value } = event.target;
        localStorage.setItem(name, value);

        let error;
        if (name === 'comp_phone') {
            error = validatePhone(value);
        } else if (name === 'comp_name') {
            error = await validateName(value);
        } else if (name === 'comp_RegNo') {
            error = await validateReg(value);
        } else if (name === 'comp_email') {
            error = await validateEmail(value);
        }

        if (error) {
            event.target.classList.add('border-red');
        } else {
            event.target.classList.remove('border-red');
        }
    };

    return (
        <Formik
            initialValues={{
                comp_name: localStorage.getItem('comp_name') || '',
                comp_email: localStorage.getItem('comp_email') || '',
                comp_RegNo: localStorage.getItem('comp_RegNo') || '',
                comp_phone: localStorage.getItem('comp_phone') || '',
            }}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {({ setFieldError, errors }) => (
                <Form>
                    <Card shadow="" padding="sm" radius="md" className="InfoInputCard">
                        <Flex
                            gap="md"
                            justify="center"
                            bg=""
                            style={{ marginBottom: "40px" }}
                        >
                            <h3 className="CompanyInfoHeader">Company Info</h3>
                        </Flex>
                        <Flex flexdirection="row" justify="space-evenly" style={{ marginBottom: "20px" }}>
                            <Flex style={{ flexDirection: "column", gap: "20px" }}>
                                <TextInput
                                    className="InfoInputArea"
                                    size="md"
                                    label="Company Name"
                                    name="comp_name"
                                    onBlur={handleBlur}
                                    radius={"8px"}
                                    required
                                />
                                <TextInput
                                    className={`InfoInputArea${errors.comp_RegNo ? 'border-red' : ''}`}
                                    size="md"
                                    label="Company registration number"
                                    name="comp_RegNo"
                                    id="CompanyReg"
                                    type="text"
                                    inputMode="numeric"
                                    required
                                    maxLength="8" minLength="8"
                                    radius={"8px"}
                                    onBlur={handleBlur}
                                />
                            </Flex>
                            <Flex style={{ flexDirection: "column", gap: "20px" }}>
                                <TextInput
                                    className="InfoInputArea"
                                    size="md"
                                    label="Company email"
                                    name="comp_email"
                                    type="email"
                                    onBlur={handleBlur}
                                    radius={"8px"}
                                    required
                                />
                                {errors.comp_RegNo && <div>{errors.comp_RegNo}</div>}
                                <NumberInput    
                                    allowNegative={false}
                                    allowDecimal={false}
                                    rightSection={<span style={{ marginRight: 15 }}>+372</span>}
                                    className="InfoInputArea"
                                    size="md"
                                    label="Company phone number"
                                    id="CompanyPhone"
                                    name="comp_phone"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder=""
                                    radius={"8px"}
                                    onBlur={handleBlur}
                                    maxLength="8"
                                />
                            </Flex>
                        </Flex>
                    </Card>
                </Form>
            )}
        </Formik>
    );
};

export default CompanyInfoInput;