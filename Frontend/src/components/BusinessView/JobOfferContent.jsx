import React from "react";
import "../../styles/BusinessView/JobOfferContentStyle.css";
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { TextInput, Flex, Select, Textarea, Paper, Button, Group, Tooltip } from '@mantine/core';

const validateJobdecsPosition = jobdecsPosition => {
    if (!jobdecsPosition) {
        return 'Required';
    }
    return '';
};

const validateExpectationsForTheCandidate = ExpectationsForCandidate => {
    if (!ExpectationsForCandidate) {
        return 'Required';
    }
    return '';
};

const JobOfferContent = () => {
    const storedTags = localStorage.getItem('job_tags');
    const [tags, setTags] = useState(storedTags ? storedTags.split(', ') : []);
    const [tagInput, setTagInput] = useState('');

    const removeTag = (index) => {
        const newTags = tags.filter((tag, i) => i !== index);
        setTags(newTags);
        localStorage.setItem('job_tags', newTags.join(', '));
    };

    const handleKeyDown = (event) => {
        if (event.key === ' ') {
            event.preventDefault(); 
            const trimmedInput = tagInput.trim(); 
    
            // Check if the tag is valid
            if (isNaN(trimmedInput) && trimmedInput.length > 1 && !trimmedInput.includes(' ')) {
                const newTags = [...tags, trimmedInput];
                setTags(newTags);
                localStorage.setItem('job_tags', newTags.join(', '));
            }
    
            // Clear the input field
            setTagInput('');
        }
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;

        // Only set the value in localStorage if the name is not 'job_tags'
        if (name !== 'job_tags') {
            localStorage.setItem(name, value);
        }

        let error;
        if (name === 'job_description') {
            error = validateJobdecsPosition(value);
        } else if (name === 'app_qualifications') {
            error = validateExpectationsForTheCandidate(value);
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
                job_description: localStorage.getItem('job_description') || '',
                app_qualifications: localStorage.getItem('app_qualifications') || '',
                job_location: localStorage.getItem('job_location') || '',
                job_salary: localStorage.getItem('job_salary') || '',
                job_term: localStorage.getItem('job_term') || '',
                offer_exp_date: localStorage.getItem('ValidUntil') || '',
            }}
        >
            {({ handleChange, setFieldValue }) => (
                <Form className="Job-Offer-box-Style">
                    <Paper padding="md" className="JobOfferCard">
                        <Flex
                            mih={50} //min-height
                            gap="xl"
                            justify="center"
                            align="center"
                            direction="row"
                            wrap="wrap"
                        >
                            <h3 className="JobOfferContentHeader">Job Offer content</h3>
                        </Flex>
                        <Textarea
                            size="md"
                            autosize
                            minRows={2}
                            radius="8px"
                            label={<span style={{ fontWeight: 'normal' }}>Job description</span>}
                            id="jobdecsPosition"
                            name="job_description"
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className="TextAreaStyling"
                            paddingleft="10px"
                        />
                        <div style={{ display: 'flex', flexdirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <label htmlFor="job_tags">Offer tags</label>
                            <Tooltip withArrow label="Press spacebar to add a tag" position="left" placement="center">
                                <TextInput
                                    style={{ width: '15%' }}
                                    placeholder="Add tags here"
                                    radius="8px"
                                    size="xs"
                                    id="job_tags"
                                    name="job_tags"
                                    value={tagInput}
                                    onBlur={handleBlur}
                                    onChange={(event) => setTagInput(event.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="Job-Offer-jobdecs"
                                />
                            </Tooltip>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: "8px" }}>
                            {tags.map((tag, index) => (
                                <Group position="apart" key={index}>
                                    <span>{tag}</span>
                                    <Button size="compact-xs" onClick={() => removeTag(index)}>X</Button>
                                </Group>
                            ))}
                        </div>
                        <Textarea
                            size="md"
                            autosize
                            minRows={2}
                            radius="8px"
                            label={<span style={{ fontWeight: 'normal' }}>Requirements for the candidate</span>}
                            id="ExpectationsForTheCandidate"
                            name="app_qualifications"
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className="TextAreaStyling"
                        />
                        <Flex style={{ justifyContent: 'center', marginBottom: "20px" }} gap="xl">
                            <Select
                                radius="8px"
                                label="Work"
                                name="job_location"
                                id="WorkLocation"
                                onChange={(value) => {
                                    setFieldValue('job_location', value);
                                    localStorage.setItem('job_location', value);
                                }}
                                data={[
                                    { value: 'Tallinn', label: 'Tallinn' },
                                    { value: 'Tartu', label: 'Tartu' },
                                    { value: 'Pärnu', label: 'Pärnu' },
                                ]}
                                className="Job-Offer-WorkLocation"
                            />
                            <TextInput
                                radius="8px"
                                label="Gross Salary"
                                id="GrossSalary"
                                name="job_salary"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className="Job-Offer-GrossSalaryFieldStyle"
                            />
                            <Select
                                radius="8px"
                                label="Term"
                                name="job_term"
                                id="Term"
                                onChange={(value) => {
                                    setFieldValue('job_term', value);
                                    localStorage.setItem('job_term', value);
                                }}
                                data={[
                                    { value: 'Full-Time', label: 'Full-Time' },
                                    { value: 'Part-Time', label: 'Part-Time' },
                                    { value: 'Contract', label: 'Contract' },
                                ]}
                                className="Job-Offer-TermFieldStyle"
                            />
                        </Flex>
                    </Paper>
                </Form>
            )}
        </Formik>
    );
};

export default JobOfferContent;