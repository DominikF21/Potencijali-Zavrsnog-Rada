import axios from "axios";

export const httpService = axios.create({
    baseURL: 'https://dominikf21-001-site1.ftempurl.com/api/v1',
    headers:{
        'Content-Type': 'application/json'
    }
});