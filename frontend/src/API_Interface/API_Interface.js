import axios from 'axios';

const axiosAgent = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});



export default class APIInterface {


    async allgames() {
        return axiosAgent.get(`all-games`);
    }
}