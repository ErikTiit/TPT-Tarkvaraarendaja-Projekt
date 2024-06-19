import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card, Space, Text, Group, Container, Image, Button, Paper, Title, Badge, Modal, Grid, Input } from '@mantine/core';
import "../../styles/StudentView/InternshipData.css"
import { UserContext } from '../../Data/UserContext';

const InternshipCards = ({ data }) => {
    const { state } = useContext(UserContext); 
    const user_id = state.user_id;
    const [opened, setOpened] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [appliedUsers, setAppliedUsers] = useState([]);
    

    useEffect(() => {
        const filtered = data.filter(offer =>
            offer.comp_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offer.app_position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offer.job_tags.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setFilteredData(filtered.length > 0 ? filtered : data);
    }, [searchTerm, data]);
    
    const fetchAppliedUsers = async (offer_id) => {
        const apiEndpoint = import.meta.env.VITE_CONTRACTSAPI;
        try {
            const response = await axios.get(`${apiEndpoint}/offer/${offer_id}`);
            setAppliedUsers(response.data);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            setAppliedUsers([]);
        }
    };

    useEffect(() => {
        const handleEnterPress = (event) => {
            if (event.key === 'Enter' && filteredData.length > 0) {
                handleOpen(event, filteredData[0]);
            }
        };
    
        window.addEventListener('keydown', handleEnterPress);
    
        return () => {
            window.removeEventListener('keydown', handleEnterPress);
        };
    }, [filteredData]);
    
    const handleOpen = async (event, offer) => {
        event.preventDefault();
        console.log('Selected offer:', offer);
        setSelectedOffer(offer);
        setOpened(true);
        setAppliedUsers([]);
        fetchAppliedUsers(offer.id);
        await fetchAppliedUsers(offer.id);
    };

    const close = () => {
        setSelectedOffer(null);
        setOpened(false);
    };

    const colors = ["blue", "red", "green", "yellow", "purple", "orange", "cyan", "gray", "teal", "lime", "pink"];

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };
    const handleApply = async () => {
        const created_at = new Date().toISOString();
        const apiEndpoint = import.meta.env.VITE_CONTRACTSAPI;
        const offer_id = selectedOffer.id;
        const data = {
            user_id,
            offer_id,
            created_at,
        };
        console.log('Data:', data);
    
        try {
            const response = await axios.post(apiEndpoint, data);
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    
        try {
            const usersResponse = await axios.get(`${apiEndpoint}/offer/${offer_id}`);
            setAppliedUsers(usersResponse.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="card-container">
            <Input placeholder="Filter offers" onChange={handleSearch} />
            {filteredData.map((offer, index) => (
                <Card key={index} shadow="lg" padding="lg" radius="xl">

                    <Grid align='flex-end'>
                        <Grid.Col span="content"><Image radius="md" h={90} w={80} fit="contain" src={offer.comp_logo || './img/placeholdercompany.png'} height={190} /></Grid.Col>
                        <Grid.Col span="content"><Title order={2}><Paper bg={'#f0f0f0'} >{offer.comp_name}</Paper></Title></Grid.Col>
                        <Grid.Col span={2} offset={3}><Button variant="filled" color="gray" size="xs" radius="xl" onClick={(event) => handleOpen(event, offer)}>Learn More</Button></Grid.Col>
                    </Grid>
                    <Space h="xl" />

                    <Group >
                        <Paper bg={'#f0f0f0'} >
                            <Text>
                                {offer.job_description}
                            </Text>
                        </Paper>
                    </Group >

                    <Space h="xl" />

                    <Group justify="flex-start" align="flex-start">
                        {offer.job_tags.split(',').map((tag, index) => (
                            <Badge key={index} color={getRandomColor()} style={{ marginRight: '5px' }}>
                                {tag}
                            </Badge>
                        ))}
                    </Group>

                </Card>
            ))}
            {selectedOffer &&
                <Modal shadow="lg" padding="lg" radius="xl" className='modal-content' size="55%" opened={opened} onClose={close} centered overlayProps={{ backgroundOpacity: 0.55, blur: 3, }}>
                    <Card>

                        <Grid align='flex-end'>
                            <Grid.Col span="content"><Image radius="md" h={90} w={80} fit="contain" src={selectedOffer.comp_logo || './img/placeholdercompany.png'} height={190} /></Grid.Col>
                            <Grid.Col span="content"><Title order={2}><Paper bg={'#f0f0f0'} >{selectedOffer.comp_name}</Paper></Title></Grid.Col>
                            <Grid.Col span={4} offset={4}><Paper bg={'#f0f0f0'} >                                <Group justify="flex-start" align="flex-start">
                                <Text ta="center"> Tags: </Text>
                                {selectedOffer.job_tags.split(',').map((tag, index) => (
                                    <Badge key={index} color={getRandomColor()} style={{ marginTop: "10px", marginRight: '5px' }}>
                                        {tag}
                                    </Badge>
                                ))}
                            </Group></Paper></Grid.Col>

                        </Grid>
                        <Space h="xl" />

                        <Card.Section>
                            <Text>Phone number: {selectedOffer.comp_phone}</Text>
                            <Text>Description: {selectedOffer.job_description}</Text>
                            <Text>Qualifications: {selectedOffer.app_qualifications}</Text>
                            <Text>Location: {selectedOffer.job_location}</Text>
                            <Text>Salary: {selectedOffer.job_salary}</Text>
                            <Text>Term: {selectedOffer.job_term}</Text>
                            <Text>Expiration Date: {selectedOffer.offer_exp_date}</Text>
                            <Text>Applied users:</Text>
                            {appliedUsers && appliedUsers.length > 0  ? (
                                <ul>
                                    {appliedUsers.filter(user => user).map((user, index) => (
                                        <li key={index}>{user.name}</li>
                                    ))}
                                </ul>
                            ) :  <Text>No users have applied for this offer.</Text>}
                        </Card.Section>
                        <Card.Section style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px' }}>
                        <Button variant="filled" color="gray" size="xs" radius="xl" onClick={() => handleApply(selectedOffer.offer_id)}>Apply</Button>
                        </Card.Section>
                    </Card>
                </Modal>
            }
        </div>
    );
};

export default InternshipCards;