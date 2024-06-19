import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../Controllers/LoginRegistrationAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Paper, Title, Grid, Text, TextInput, PasswordInput, Button, Alert } from "@mantine/core";

const UserRegister = () => {
    const navigate = useNavigate();
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        course: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        course: Yup.string().max(8, 'Course must be 8 characters or less').required('Course is required'),
    });

    const onSubmit = (values, { setSubmitting, setStatus }) => {
        console.log(values);
        registerUser(values)
        .then(data => {
            setSubmitting(false);
            navigate('/user-login');
        })
        .catch(error => {
            console.error(error);
            setStatus('There was an error registering. Please try again.');
            setSubmitting(false);
        });

    };

    const CustomInput = ({ field, form: { touched, errors }, ...props }) => {
        return <TextInput {...field} {...props} error={touched[field.name] && errors[field.name]} />;
    };

    const CustomPassword = ({ field, form: { touched, errors }, ...props }) => {
        return <PasswordInput {...field} {...props} error={touched[field.name] && errors[field.name]} />;
    };

    return (
        <Container fluid w={500}>
            <Paper radius="md" p="xl">
                <Title ta="center" order={1}>
                    Register
                </Title>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(formik) => (
                        <Form onSubmit={formik.handleSubmit} className="register-form">
                            {formik.status &&
                                <Alert variant="filled" color="red" radius="xl" title="Registration Error">
                                    {formik.status}
                                </Alert>}
                            <Grid gutter="md">
                                <Grid.Col span={8}>
                                    <Field component={CustomInput} label="Name" name="name" placeholder="Your Name" variant='filled' radius="xl" size='xl' />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <Field component={CustomInput} label="Course" name="course" placeholder="Course" variant='filled' radius="xl" size='xl' />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <Field component={CustomInput} label="Email" name="email" placeholder="...@example.com" variant='filled' radius="xl" size='xl' />
                                    <Field component={CustomPassword} label="Password" name="password" placeholder="Password" variant='filled' radius="xl" size='xl' />
                                    <Field component={CustomPassword} label="Confirm Password" name="confirmPassword" placeholder="Confirm Password" variant='filled' radius="xl" size='xl' />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button type="submit" mb={5} radius="xl" style={{ backgroundColor: '#f0f0f0', color: "black" }}>
                                            Register
                                        </Button>
                                    </div>
                                    <div>
                                        <Text align="center" size="xs" fw={100}>
                                            Already a user? <Link to="/user-login">Login instead</Link>
                                        </Text>
                                    </div>
                                </Grid.Col>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
};

export default UserRegister;
