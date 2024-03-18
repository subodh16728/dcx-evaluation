import axios from "axios";

const baseUrl = 'http://localhost:4000/api/users'

const signUpUser = async (user) => {
    const response = await axios.post(`${baseUrl}/signup`,user)

    if(response.status == 200){
        const users = await response.data;
        return users;
    }
}

const signInUser = async (user) => {
    const response = await axios.post(`${baseUrl}/signin`,user)

    if(response.status == 200){
        const users = await response.data;
        return users;
    }
}

const getUserById = async (id) => {
    console.log(id);
    const response = await axios.get(`${baseUrl}/${id}`)

    if(response.status == 200){
        const users = await response.data;
        return users;
    }
}

const modifyById = async (id,data) => {
    try{
        const response = await axios.put(`${baseUrl}/wishlist/${id}`,data);
        return response.data;
    }catch (error){
        throw new Error("Error wishlisting Product:",error);
    }
}

const getWishlistedProducts = async (id) => {
    const response = await axios.get(`${baseUrl}/wishlist/${id}`)

    if(response.status == 200){
        const users = await response.data;
        return users;
    }
}

export {signUpUser,signInUser, getUserById , modifyById , getWishlistedProducts}