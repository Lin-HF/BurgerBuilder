import axios from 'axios';

const instance  = axios.create({
    baseURL: 'https://react-my-burger-3726e.firebaseio.com/'
});

export default instance;