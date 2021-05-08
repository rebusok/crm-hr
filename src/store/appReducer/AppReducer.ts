export interface stateProps {
    isInitial: boolean
    disabledBtn: boolean
}


const initialState: stateProps = {
    isInitial: false,
    disabledBtn: false
}


//Type
export enum ActionType {
    SET_INITIAL_APP = 'APP/INITIAL_APP',
    SET_DISABLED_BTN = 'SET_DISABLED_BTN',

}

//actions
export type AppType = ReturnType<typeof setInitialApp> | ReturnType<typeof setDisabledBtn>


export const AppReducer = (state: stateProps = initialState, action: AppType): stateProps => {
    switch (action.type) {
        case ActionType.SET_INITIAL_APP:
            return {...state, ...action.payload}
        case ActionType.SET_DISABLED_BTN:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setInitialApp = (isInitial:boolean) => ({type:ActionType.SET_INITIAL_APP, payload:{isInitial}})
export const setDisabledBtn= (disabledBtn:boolean) => {
    console.log('DIASDSADA')
    return{type:ActionType.SET_DISABLED_BTN, payload:{disabledBtn}}
}
