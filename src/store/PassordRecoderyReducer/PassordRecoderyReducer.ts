import {RequestStatusType} from "../TableReducer/TableType";
import {AppThunk} from "../store";
import {ApiAuth} from "../../Api/Api";
import {HelperErrorCatch} from "../../helper/error-handler";


export interface stateProps {
    checkWith: boolean
    status: RequestStatusType
}


const initialState: stateProps = {
    checkWith: false,
    status: "succeeded"
}


//Type
export enum ActionType {
    SET_CHECK_WITH = 'RES-PASS/SET-CHECK-WITH',
    SET_STATUS = 'RES-PASS/SET_STATUS'
}


//actions

export const setStatus = (status: RequestStatusType) => ({type: ActionType.SET_STATUS, payload: {status}})
export const setChekWith = (checkWith: boolean) => ({type: ActionType.SET_CHECK_WITH, payload: {checkWith}})


const PasswordRecoweryReducer = (state: stateProps = initialState, action: ResPasswordType): stateProps => {
    switch (action.type) {
        case ActionType.SET_STATUS: {
            return {...state, ...action.payload}
        }
        case ActionType.SET_CHECK_WITH: {
            return {...state, ...action.payload}
        }
    }
    return state
}

export const setChekWithThunk = (email: string): AppThunk => async (dispatch) => {
    dispatch(setStatus('loading'))
    try {
        await ApiAuth.recovery(email)
        dispatch(setChekWith(true))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        HelperErrorCatch(e, dispatch)
    }

}

export type ResPasswordType = ReturnType<typeof setStatus> | ReturnType<typeof setChekWith>

export default PasswordRecoweryReducer