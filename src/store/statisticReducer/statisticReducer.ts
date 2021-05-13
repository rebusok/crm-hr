import {TableRowType} from "../TableReducer/TableType";
import {v4} from 'uuid'

type StatisticTableTypeInit = {
    statisticArray: tableStattistic[]
}
export type tableStattistic = {
    id: string
    rowStatist: TableRowType[] | []
}

const initialState: StatisticTableTypeInit = {
    statisticArray:[]
} as StatisticTableTypeInit

enum ActionType {
    ADD_NEW_STATISTIC_TABLE = 'ADD_NEW_STATISTIC_TABLE',
    SET_FILER_TABLE = 'SET_FILER_TABLE'
}

export type statisticActionType = ReturnType<typeof addNewStatisticTable> | ReturnType<typeof setFiler>

export const StatisticReducer = (state: StatisticTableTypeInit = initialState, action: statisticActionType) => {
    switch (action.type) {
        case ActionType.ADD_NEW_STATISTIC_TABLE:
            return {
                ...state,
                statisticArray: [...state.statisticArray, {id: action.id, rowStatist: []}]
            }
        case ActionType.SET_FILER_TABLE:

            const table = state.statisticArray.find(el => el.id === action.id)
            if(table) {
                const newEl = {...table, rowStatist:[...action.rowStatist]} as tableStattistic
                return {
                    ...state,
                    statisticArray:state.statisticArray.map(
                        el => el.id === action.id
                            ? newEl
                            : el
                    )
                }
            }else {
                return  state
            }


        default:
            return state
    }
}

export const addNewStatisticTable = () => {
    return {
        type: ActionType.ADD_NEW_STATISTIC_TABLE, id: v4()
    } as const
}
export const setFiler = (rowStatist: TableRowType[] | [], id:string) =>  {
    return{type:ActionType.SET_FILER_TABLE, rowStatist, id} as const
}



