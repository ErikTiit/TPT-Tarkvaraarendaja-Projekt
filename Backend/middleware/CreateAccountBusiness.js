import axios from 'axios';

export const createAccountBusiness = async (companyData) => {
    try {
        const response = await axios.post(`${process.env.URL}:${process.env.PORTBACKEND}/api/student`, companyData.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};