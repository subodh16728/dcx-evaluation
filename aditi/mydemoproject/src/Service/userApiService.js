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
    const response = await axios.get(`${baseUrl}/${id}`)

    if(response.status == 200){
        const users = await response.data;
        return users;
    }
}


export {signUpUser,signInUser, getUserById}