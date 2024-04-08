// frontend/services/apiService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/products'; // Replace with your backend URL

const apiService = {
    getProducts: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/products`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw new Error('Failed to fetch products');
        }
    }
};

export default apiService;
