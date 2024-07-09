import axios from 'axios'
import { Platform } from 'react-native';

const AxiosInstance = axios.create({
    baseURL: Platform.select({
        ios: 'http://localhost:3000',
        android: 'http://10.0.2.2:3000'
    }),
    // timeout: 10000
})

AxiosInstance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {

    console.log('Error code', error)
    return Promise.reject(error);
});

export default AxiosInstance