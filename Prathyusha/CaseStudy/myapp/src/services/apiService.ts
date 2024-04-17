import axios from 'axios';

interface user {
    username:string,
    email: string,
    password: string
    confirmpassword:string
}

interface product {
    _id: string;
    name: string,
    description: string,
    category: string,
    price: null | number,
    bookmarked: boolean
}

const registerBaseUrl = 'http://localhost:4000/api/register';
const productBaseUrl = 'http://localhost:4000/api/products';
const loginBaseUrl = 'http://localhost:4000/api/user/login';

const postUser = async (user:user) => {
    try {
        const response = await axios.post(registerBaseUrl, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            console.log("User posted successfully");
            console.log("Form response: " + response.data);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error posting user:', error);
        return false;
    }
};

const validateUser = async (user:user) => {
    try {
        const response = await axios.post(loginBaseUrl, user);

        if (response.status === 200) {
            console.log('User is validated');
            return true;
        } else {
            console.log('User validation failed');
            return false;
        }
    } catch (error) {
        console.error('Error validating user:', error);
        return false;
    }
};

const getProducts = async () => {
    try {
        const response = await axios.get(productBaseUrl);

        if (response.status === 200) {
            const products = response.data;
            return products;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
};

const getProductById = async (productId:product) => {
    try {
        const response = await axios.get(`${productBaseUrl}/${productId}`);
        if (response.status === 200) {
            const product = response.data;
            return product;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return null;
    }
};

const postProduct = async (product:product) => {
    try {
        const response = await axios.post(productBaseUrl, product, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            console.log("Product posted successfully");
            console.log("Form response: " + response.data);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error posting product:', error);
        return false;
    }
};

const putProduct = async (productId:product, product:product) => {
    try {
        const response = await axios.put(`${productBaseUrl}/${productId}`, product, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            console.log("Product updated successfully");
            console.log("Form response: " + response.data);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error updating product:', error);
        return false;
    }
};


const getBookmarkedProducts = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/products/bookmarked-products'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching bookmarked products:', error);
        return null;
    }
};

const toggleBookmark = async (productId: string, data: { bookmarked: boolean }) => {
    try {
        const response = await axios.put(`${productBaseUrl}/bookmark/${productId}`, data);
        return response.data;
    } catch (error) {
        console.error('Error toggling bookmark:', error);
        throw error; // Optionally rethrow the error for handling in the component
    }
};




export { postUser, validateUser, getProducts, getProductById, postProduct, putProduct, getBookmarkedProducts, toggleBookmark };
