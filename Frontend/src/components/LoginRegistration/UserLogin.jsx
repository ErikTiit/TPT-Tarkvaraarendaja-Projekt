import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../Controllers/LoginRegistrationAPI';
import { TextInput, PasswordInput, Container, Paper, Title, Stack, Group, Anchor, Button, Text, Alert } from "@mantine/core";
import { UserContext } from '../../Data/UserContext';

const UserLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useContext(UserContext); 

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values, { setSubmitting, setStatus }) => {
    console.log(values);
    loginUser(values)
      .then(data => {
        console.log(data);
        setSubmitting(false);
        dispatch({ type: 'LOGIN', payload: { user_id: data.user_id, email: data.email } });
        navigate('/student-offer');
      })
      .catch(error => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          setStatus('Email or password is incorrect. Please try again.');
        } else {
          setStatus('There was an error logging in. Please try again.');
        }
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
      <Paper radius="md" p="xl" >
        <Container mb={5} fluid w={300} bg={'#f0f0f0'} style={{ borderRadius: '20px', boxShadow: '0px 3px 6px #00000029' }}>
          <Title ta="center" order={1}>
            Praktikaportaal
          </Title>
        </Container>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(formik) => (
            <Form onSubmit={formik.handleSubmit} className="login-form">
              {formik.status &&
                <Alert variant="filled" color="red" radius="xl" title="Login Error">
                  {formik.status}
                </Alert>}
              <Stack mt="xl">
                <Field component={CustomInput} label="Email" name="email" placeholder="...@tptlive.ee" variant='filled' radius="xl" size='xl' />

                <Group justify="flex-end"  >
                  <Anchor onClick={(event) => event.preventDefault()} href="#" size="xs" underline="always">
                    Forgot password?
                  </Anchor>
                </Group>
                <Field component={CustomPassword} label="Password" name="password" placeholder="..." variant='filled' radius="xl" size='xl' />

              </Stack>
              <Stack mt="xl" align="center" >
                <Button type="submit" mb={5} radius="xl" style={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc', color: "black" }}>
                  Login
                </Button>
                <Stack >
                  <Text align="center" size="xs" fw={100}>
                    Don't have an account?
                  </Text>
                  <Button radius="xl" style={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc', color: "black" }} onClick={() => navigate('/user-register')}>
                    Register
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default UserLogin;

