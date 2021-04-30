import axios from "axios";

const configOMB = {
    // localBack
    // baseURL: "http://localhost:3010/",
    // heroku
    baseURL: 'http://localhost:3010/',


};
const axiosInstance = axios.create(configOMB);

export const ApiAuth = {
    login(email: string, password: string, rememberMe: boolean) {
        return axiosInstance.post('auth/', {email,password, rememberMe})
    }
}


