import axios from 'axios';

export const exportReport = async () => {
    return axios.post(`https://jsonplaceholder.typicode.com/posts`)
        .then((response) => response.data);
}