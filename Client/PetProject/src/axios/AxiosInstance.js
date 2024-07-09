import axios from 'axios'

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    // timeout: 10000
})

AxiosInstance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {

    console.log('Error code', error)
    return Promise.reject(error);
});

export default AxiosInstance