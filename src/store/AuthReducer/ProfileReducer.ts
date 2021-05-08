export interface stateProps {
    profile: ResponseTypeProfile | null

}

type ResponseTypeProfile = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}


const initialState = {
    profile: null
}


//Type
export enum ActionType {
    SET_PROFILE = 'PROFILE/SET_PROFILE',
    CLEAN_PROFILE = 'PROFILE/CLEAN_PROFILE'
}

const ProfileReducer = (state: stateProps  = initialState, action: ActionProfileType): stateProps  => {
    switch (action.type) {

        case ActionType.SET_PROFILE:
            return {...state, profile: {...action.payload}}
        case ActionType.CLEAN_PROFILE:
            return {...state, profile: null}
        default: return  state
    }

}

export const setProfileAc = (profile: ResponseTypeProfile ) => {
    return {type: ActionType.SET_PROFILE, payload: profile} as const
}
export const cleanProfile = () => {
    return {type:ActionType.CLEAN_PROFILE} as const
}

export type ActionProfileType = ReturnType<typeof setProfileAc> | ReturnType<typeof cleanProfile>


export default ProfileReducer