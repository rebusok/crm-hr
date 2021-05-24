import axios from "axios";
import {StatusType, TotalType} from "../store/TableReducer/TableType";
import {htmlGmail} from "../helper/gmail";

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
    recovery(email: string) {
        return axiosInstance.post('/auth/forgot', {
            email, message: `${htmlGmail}`
        })
    },
    changePas(password: string, token: string) {
        return axiosInstance.post('/auth/set-new-password', {
            password: password,
            resetPasswordToken: token
        })
    }

}

export const ApiCandidatePack = {
    addNewCandidate(candidatesPack:candidatePackUpdate) {
        return axiosInstance.post('candidates/pack', {candidatesPack:candidatesPack})
    },
    getCandidatesPack (user_id:string, packName?: string, searchStatus?: string, searchTotal?:string,searchPosition?:string, sortPacks?:string) {
        return axiosInstance.get('candidates/pack', {params:{user_id, packName, searchStatus, searchTotal, sortPacks, searchPosition}})
    },
    updateCandidatesPack(candidatePack:candidatePackUpdate) {
        return axiosInstance.put('candidates/pack', {candidatePack})
    }
}


export interface candidatePackUpdate {
    name?: string
    _id?: string
    position?: string
    status?: StatusType | ''
    recommendation?: string
    leaderInterview?: boolean
    date?: string
    phone?: string
    SS?: string | null
    total?: TotalType | ''
    meeting?: boolean
}

export interface candidatePacKAdd {
    date: string,
    name: string
    time: string
    position: string
    phone: string

}

