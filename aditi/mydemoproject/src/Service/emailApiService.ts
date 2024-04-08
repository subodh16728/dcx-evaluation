import axios from 'axios';
import { Offer } from '../utils/models';

const baseUrl = 'http://localhost:4000/api/email'

const sendEmailtoUser = async (email:string,data:Offer) => {
    const response =await axios.post(`${baseUrl}/sendemail`,{email,data});
    if (response.status === 200) {
        const products = await response.data
        return products
    }
    else {
        return null;
    }
}

export {sendEmailtoUser}