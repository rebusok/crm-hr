import {AxiosError} from "axios";
import {Dispatch} from "react";
import {setErrorMes, setStatusAC} from "../store/AuthReducer/AuthReducer";
import {StatusFetchEnum} from "../store/TableReducer/TableType";

export const HelperErrorCatch = (e:AxiosError, dispatch: Dispatch<ErrorDispatchType>) => {
    const error =  e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
    console.log(error)
    dispatch(setErrorMes(error))
    dispatch(setStatusAC(StatusFetchEnum.FAIL))
    console.log('errors:', {...e})
}

type ErrorDispatchType = ReturnType<typeof setErrorMes> | ReturnType<typeof setStatusAC>
