import axios from 'axios';
 
const registerBaseUrl = 'http://localhost:4000/api/register'
const productBaseUrl = 'http://localhost:4000/api/products'

 
const postUser = async (user) => {
 
    const response = await axios.post(registerBaseUrl, user, {
        headers: {
        'Content-Type' : 'application/json'
    }
})
      
    if (response.status === 200) {
        console.log("user posted successfully")
        console.log("Form response" + response.data)
        return true;
    }
    else {
        return false;
    }
}
const loginBaseUrl = 'http://localhost:4000/api/user/login'

const validateUser = async (user) => {
    try{
        const response = await axios.post(loginBaseUrl, user);
        // Check if the response indicates a successful validation
        if (response.status === 200) {
            // User is validated
            console.log('User is validated');
            return true;
        } else {
            // Validation failed
            console.log('User validation failed');
            return false;
        }
    } catch (error) {
        // Handle network errors or other issues
        console.error('Error validating user:', error);
        return false;
    }
}

 
const getProducts = async () => {
 
    const response = await axios.get(productBaseUrl)
    if (response.status === 200) {
        const products = response.data
        return products
    }
    else {
        return null
    }
}

const postProduct = async (Product) => {
 
    const response = await axios.post(productBaseUrl, Product, {
        headers: {
        'Content-Type' : 'application/json'
    }
})
      
    if (response.status === 200) {
        console.log("product posted successfully")
        console.log("Form response" + response.data)
        return true;
    }
    else {
        return false;
    }
}

 
export { postUser, validateUser, getProducts, postProduct }