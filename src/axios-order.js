import axios from 'axios';
const instance =axios.create({
    baseURL:'https://react-my-burger-5d54d.firebaseio.com/'
})
export default instance;