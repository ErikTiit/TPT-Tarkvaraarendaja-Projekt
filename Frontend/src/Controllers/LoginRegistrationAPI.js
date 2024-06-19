import axios from 'axios';

console.log(import.meta.env.VITE_STUDENTAPI);
console.log(import.meta.env.VITE_LOGINAPI);
console.log(import.meta.env.VITE_CHECKAUTHAPI);
export const registerUser = async (values) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_STUDENTAPI}`, values, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`API request failed with status ${response.status}`);
            //k
        }

        console.log('Response data:', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const loginUser = async (values) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_LOGINAPI}`, values, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        if (response.status !== 200) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        console.log('Response data:', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const checkAuth = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_CHECKAUTHAPI}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };