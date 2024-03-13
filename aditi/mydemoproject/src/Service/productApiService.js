import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/product'


const getproducts = async () => {

    const response = await axios.get(baseUrl)
    if (response.status === 200) {
        const products = await response.data
        return products
    }
    else {
        return null;
    }
}

const postProduct = async (data) => {

    const response = await axios.post(baseUrl,data)
    if (response.status === 200) {
        const products = await response.data
        return products
    }
    else {
        return null;
    }
}



const getproductByCategory = async (category) => {

    const response = await axios.get(`${baseUrl}/category?category=${category}`)
    if(response.status === 200){
        const products = await response.data;
        return products;
    }
}

const getNewProducts = async () => {
    const response = await axios.get(`${baseUrl}/newproducts`)
    if(response.status === 200){
        const products = await response.data;
        return products;
    }
}

    const getProductById = async (id) => {
        const response = await axios.get(`${baseUrl}/${id}`)

            if(response.status == 200){
                const products = await response.data;
                return products;
            }
    }

const searchProductsByName = async (product) => {
    try {
        const response = await axios.get(`${baseUrl}/search?productName=${product}`);
        return response.data;
    } catch (error) {
        throw new Error('Error searching product:', error);
    }
}
const modifyById = async (id,data) => {
    try{
        const response = await axios.put(`${baseUrl}/update/${id}`,data);
        return response.data;
    }catch (error){
        throw new Error("Error Updating Product:",error);
    }
}

const getBookmarkedProducts = async() =>{
    const response = await axios.get(`${baseUrl}/bookmarked`)
    if (response.status === 200) {
        const products = await response.data
        return products
    }
    else {
        return null;
    }
}

export { getproducts,getproductByCategory,getNewProducts ,searchProductsByName,
     getProductById, postProduct, modifyById, getBookmarkedProducts}
