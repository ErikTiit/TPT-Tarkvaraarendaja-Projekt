import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Text, Container, SimpleGrid, Title } from '@mantine/core';
import classes from './ArticleCardImage.module.css';
import studentImage from './img/student.jpeg';
import staffImage from './img/teacher.jpg';
import businessImage from './img/business.jpg';

const CardComponent = ({ title, navigateTo, imageSrc, disabled }) => {
    const navigate = useNavigate();

    return (
        <div>
            <Card
                key={classes.title}
                p="md"
                radius="md"
                component="a"
                onClick={!disabled ? () => navigate(navigateTo) : null}
                className={`${classes.card} ${disabled ? classes.disabled : ''}`}
                style={{ backgroundImage: `url(${imageSrc})` }}
            />
            <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
                {`I am a ${title.toLowerCase()}`}
            </Text>
        </div>
    );
};
  
  const Home = () => {
    return (
      <Container py="xl" px="xl">
        <Title align="center" size="xl" mt="md" mb="lg" style={{paddingBottom: '20px'}}>Welcome to the internship portal</Title>
        <SimpleGrid cols={{ base: 1, sm: 2 , md: 3}}>
          <CardComponent title="Student" navigateTo="/user-register" imageSrc={studentImage} />
          <CardComponent title="Staff" navigateTo="/user-login" imageSrc={staffImage} disabled />
          <CardComponent title="Business" navigateTo="/business-offer" imageSrc={businessImage} />
        </SimpleGrid>
      </Container>
    );
  };

export default Home;