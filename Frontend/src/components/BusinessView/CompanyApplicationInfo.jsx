import React from "react";
import { Formik, Field, Form } from 'formik';
import "../../styles/BusinessView/CompanyApplicationInfoStyle.css"
import { TextInput, Flex, Card, Autocomplete } from '@mantine/core';


const validateApplicantPosistion = app_position => {
    if (!app_position) {
        return 'Required';
    }
    return '';
};

const validateFieldOfWork = FieldOfWork => {
    if (!FieldOfWork) {
        return 'Required';
    }
    return '';
};


const CompanyApplicationInfo = () => {
    const handleBlur = (event) => {
        const { name, value } = event.target;
        localStorage.setItem(name, value);

        let error;
        if (name === 'app_position') {
            error = validateApplicantPosistion(value);
        } else if (name === 'job_workField') {
            error = validateFieldOfWork(value);
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
                app_position: localStorage.getItem('app_position'),
                job_workField: localStorage.getItem('job_workField'),
            }}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {() => (
                <Form>
                    <Card shadow="" padding="sm" radius="md" className="CompanyInfoCard">
                        <Flex
                            gap="md"
                            justify="center"
                            bg=""
                            style={{ marginBottom: "40px" }}
                        >
                            <h3 className="ApplicationInfoHeader">Application Info</h3>
                        </Flex>
                        <Flex justify="space-evenly" style={{ marginBottom: "20px" }}>
                            <Autocomplete
                            data={['Junior developer', 'Senior Developer', 'Admin']} //saab hiljem APIga siduda
                                label="Applicant position"
                                className="ApplicationInputArea"
                                id="ApplicantPosition"
                                name="app_position"
                                size="md"
                                onBlur={handleBlur}
                                radius={"8px"}
                                required
                            />
                            <Autocomplete
                                data={['IT', 'TA']} //saab hiljem APIga siduda
                                label="Field of work"
                                className="ApplicationInputArea"
                                id="FieldOfWork"
                                name="job_workField"
                                size="md"
                                onBlur={handleBlur}
                                radius={"8px"}
                                required
                            />
                        </Flex>
                    </Card>
                </Form>
            )}
        </Formik>
    );
};

export default CompanyApplicationInfo;