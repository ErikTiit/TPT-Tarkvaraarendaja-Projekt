import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/ContractView/ContractList.css"
import { Flex, Button } from '@mantine/core';

const List = () => {
    const [contracts, setContracts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContracts = async () => {
            const response = await axios.get('http://localhost:3000/api/contract');
            setContracts(response.data);
        };

        fetchContracts();
    }, []);

    const openContract = (id) => {
        navigate(`/contract/${id}`);
    };

    // const deleteContract = async (id) => { //temp
    // try {
    //     const response = await fetch(`http://localhost:3000/api/contract/${id}`, {
    //         method: 'DELETE',
    //     });

    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     setContracts(contracts.filter(contract => contract.id !== id));
    // } catch (error) {
    //     console.error('Error:', error);
    // }
    //};

    return (
        <div className='container'>
            <h1>Contract List</h1>
            <Flex direction="column" className="contracts-container">
                {contracts.map((contract) => (
                    <div key={contract.id} className="contract-box">
                        <label for="" className='labels'>Company Name:</label>
                        <p>{contract.companyName}</p>
                        <label for="" className='labels'>Student Name:</label>
                        <p>{contract.studentName}</p>
                        <label for="" className='labels'>Company Register Code:</label>
                        <p>{contract.companyRegisterCode}</p>
                        <Button onClick={() => openContract(contract.id)}>Edit Contract</Button>
                        <Button color="red" style={{ marginLeft: '20px' }} onClick={() => window.open(`http://localhost:3000/api/contract/${contract.id}/pdf`, "_blank")}>Download as PDF</Button>
                        {/* <Button onClick={() => deleteContract(contract.id)}>Delete Contract</Button> */}
                    </div>
                ))}
            </Flex>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={() => navigate('/contract/create')}>Create Contract</Button>
            </div>
        </div>
    );
}

export default List;