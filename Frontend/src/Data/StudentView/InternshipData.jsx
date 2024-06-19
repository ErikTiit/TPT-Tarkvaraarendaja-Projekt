import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InternshipCards from "../../components/StudentView/InternshipCards";
import "../../styles/StudentView/InternshipData.css"

const InternshipData = () => {
    const [data, setData] = useState([]);
    const backendUrl = `${import.meta.env.VITE_URL}:${import.meta.env.VITE_PORTBACKEND}`;

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/offers`);
                const offers = response.data;
                for (const offer of offers) {
                    const usersResponse = await axios.get(`${backendUrl}/api/contracts/offer/${offer.id}`)
                    .then(usersResponse => {
                        offer.appliedUsers = usersResponse.data;
                    })
                    .catch(error => {
                        console.error(`Error fetching contracts for offer ${offer.id}:`, error);
                    });
                }
                setData(offers);
            } catch (error) {
                console.error(error);
            }
        };
        fetchOffers();
    }, []);

    return (
        <div className="internship-data">
            <InternshipCards data={data} />
        </div>
    );
};

export default InternshipData;