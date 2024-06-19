import axios from 'axios';

export const sendCompanyDataToAPI = async (companyData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_COMPANIESAPI}`, companyData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        console.log('Response data:', response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }

    console.log('Sending data:', companyData);
};

export const sendOffersDataToAPI = async (offersData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_OFFERSAPI}`, offersData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`API request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};