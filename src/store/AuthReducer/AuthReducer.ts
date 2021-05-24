import {RequestStatusType, StatusFetchEnum} from "../TableReducer/TableType";
import {AppThunk} from "../store";
import {ApiAuth} from "../../Api/Api";
import {cleanProfile, setProfileAc} from "./ProfileReducer";
import {setDisabledBtn, setInitialApp} from "../appReducer/AppReducer";
import {HelperErrorCatch} from "../../helper/error-handler";

export interface stateProps {
    isLogin: boolean
    status: RequestStatusType
    errorMes: string | null
}
const initialState: stateProps = {
    isLogin: false,
    status: "succeeded",
    errorMes: null
}
export enum ActionType {
    SET_LOGIN = 'AUTH/SET_LOGIN',
    SET_STATUS = 'AUTH/SET_STATUS',
    SET_ERROR_MES = 'AUTH/SET_ERROR_MES'
}

const AuthReducer = (state: stateProps = initialState, action: AuthType): stateProps => {
    switch (action.type) {
        case ActionType.SET_LOGIN:
            return {...state, ...action.payload}
        case ActionType.SET_STATUS: {
            return {...state, ...action.payload}
        }
        case ActionType.SET_ERROR_MES:
            return {...state, ...action.payload}
    }
    return state
}
export const setLoginAC = (isLogin: boolean) => ({type: ActionType.SET_LOGIN, payload: {isLogin}})
export const setStatusAC = (status: RequestStatusType) => ({type: ActionType.SET_STATUS, payload: {status}})

export const setErrorMes = (errorMes: string) => ({type: ActionType.SET_ERROR_MES, payload: {errorMes}})

export type AuthType = ReturnType<typeof setLoginAC> | ReturnType<typeof setStatusAC> | ReturnType<typeof setErrorMes>




//Thunk

export const setLoginT = (email: string, password: string, rememberMe: boolean): AppThunk => async(dispatch) => {
    dispatch(setStatusAC(StatusFetchEnum.LOADING))
    dispatch(setDisabledBtn(true))
    try {
      const res =  await ApiAuth.login(email, password, rememberMe)
        dispatch(setProfileAc(res.data))
        dispatch(setLoginAC(true))
        dispatch(setErrorMes(''))
        dispatch(setStatusAC(StatusFetchEnum.OK))
    }catch (e) {
        HelperErrorCatch(e, dispatch)
        dispatch(setLoginAC(false))
    }finally {
        dispatch(setDisabledBtn(false))
    }
}
export const setAuthMe = (): AppThunk => async (dispatch) => {
    dispatch(setDisabledBtn(true))
    dispatch(setStatusAC(StatusFetchEnum.LOADING))
    try {
        const res = await  ApiAuth.authMe()
        dispatch(setErrorMes(''))
        dispatch(setProfileAc(res.data))
        dispatch(setLoginAC(true))
        dispatch(setStatusAC(StatusFetchEnum.OK))
    }catch (e) {
        HelperErrorCatch(e, dispatch)
        dispatch(setLoginAC(false))
    }finally {
        dispatch(setInitialApp(true))
        dispatch(setDisabledBtn(false))
    }
}
export const setRegistration = (email: string, password: string): AppThunk  => async (dispatch) => {
    dispatch(setStatusAC(StatusFetchEnum.LOADING))
    debugger
    dispatch(setDisabledBtn(true))
    try{
         const res = await ApiAuth.registration(email, password)
        console.log(res)
        dispatch(setErrorMes(''))
        dispatch(setStatusAC(StatusFetchEnum.OK))
    }catch (e) {
        HelperErrorCatch(e, dispatch)
    } finally {
        dispatch(setDisabledBtn(false))
    }
}
export const setLogOut = (): AppThunk =>async (dispatch) => {
    dispatch(setStatusAC(StatusFetchEnum.LOADING))
    dispatch(setDisabledBtn(true))
    try{
        await ApiAuth.logOut()
        dispatch(setErrorMes(''))
        dispatch(setLoginAC(false))
        dispatch(setStatusAC(StatusFetchEnum.OK))
        dispatch(cleanProfile())
    }catch (e) {
        HelperErrorCatch(e, dispatch)
    }finally {
        dispatch(setDisabledBtn(false))
    }

}
export default AuthReducer