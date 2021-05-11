import axios from "axios";
import {StatusType, TotalType} from "../store/TableReducer/TableType";

const configOMB = {
    // localBack
    // baseURL: "https://crm-back-hr.herokuapp.com/",
    // heroku
    baseURL: 'http://localhost:7542/',
    withCredentials: true,

};
const axiosInstance = axios.create(configOMB);

export const ApiAuth = {
    login(email: string, password: string, rememberMe: boolean) {
        return axiosInstance.post('auth/login', {email,password, rememberMe})
    },
    registration(email:string, password: string) {
        return axiosInstance.post('auth/registration', {email, password})
    },
    authMe() {
        return axiosInstance.post('auth/me')
    },
    logOut() {
        return axiosInstance.delete('/auth/me')
    },

}

export const ApiCandidatePack = {
    addNewCandidate(candidatesPack:candidatePackUpdate) {
        return axiosInstance.post('candidates/pack', {candidatesPack:candidatesPack})
    },
    getCandidatesPack (user_id:string, packName?: string, searchStatus?: string, searchTotal?:string, sortPacks?:string) {
        return axiosInstance.get('candidates/pack', {params:{user_id, packName, searchStatus, searchTotal, sortPacks}})
    },
    updateCandidatesPack(candidatePack:candidatePackUpdate) {
        return axiosInstance.put('candidates/pack', {candidatePack})
    }
}


export interface candidatePackUpdate {
    name?: string
    _id?: string
    position?: string
    status?: StatusType
    recommendation?: string
    leaderInterview?: boolean
    date?: string
    SS?: string | null
    total?: TotalType
    meeting?: boolean
}


