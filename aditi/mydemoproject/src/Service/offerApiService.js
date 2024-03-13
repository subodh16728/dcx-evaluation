
import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/offer'

const getProductOffers = async () => {
    const response = await axios.get(baseUrl)

    if (response.status === 200) {
        const products = await response.data
        return products
    }
    else {
        return null;
    }
}

const getProductOfferById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)

            if(response.status == 200){
                const products = await response.data;
                return products;
            }
}

export {getProductOffers, getProductOfferById}