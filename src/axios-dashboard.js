import axios from 'axios';

const instance = axios.create({
    baseURL:'https://api2.funedulearn.com/',
});

export default instance;