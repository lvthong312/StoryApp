import AxiosInstance from "axios";

export function axiosResponseConfig() {
    AxiosInstance.interceptors.response.use(function (response) {
        return response.data;
    }, function (error) {

        console.log('Error code', error)
        return Promise.reject(error);
    });

}
export default AxiosInstance 