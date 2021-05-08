import {HeadCellsType, RequestStatusType, StatusFetchEnum, TableRowType} from './TableType'
import { rows} from "../../data";
import {AppActionType, AppRootStateType} from "../store";
import {ThunkDispatch} from "redux-thunk";
import {ApiCandidatePack} from "../../Api/Api";
import {setDisabledBtn} from "../appReducer/AppReducer";

const initialState: TableTypeInit = {
    rows: rows,
    edditRows: [],
    searchTotal: '',
    searchStatus: '',
    status: StatusFetchEnum.OK,
    totalPacks: null
}
type TableTypeInit = {
    rows: TableRowType[] | []
    edditRows: TableRowType[] | []
    searchTotal: string
    searchStatus: string
    status: RequestStatusType
    totalPacks: number | null
}

//Type
export enum ActionType {
    EDIT_TABLE_ROW = 'EDIT_TABLE_ROW',
    EDIT_TABLE_ROW_SUCSESS = 'EDIT_TABLE_ROW_SUCSESS',
    CLEAR_EDIT_TABLE = 'CLEAR_EDIT_TABLE',
    ADD_NEW_TABLE = 'ADD_NEW_TABLE',
    EDIT_VALUE_ROW = 'EDIT_VALUE_ROW',
    ADD_SEARCH_STATUS = 'ADD_SEARCH_STATUS',
    ADD_SEARCH_TOTAL = 'ADD_SEARCH_TOTAL',
    FETCH_CANDIDATES_PACK = 'FETCH_CANDIDATES_PACK',
    SET_FETCH_STATUS = 'SET_FETCH_STATUS',
    SET_TOTAL_COUNT = 'SET_TOTAL_COUNT',
}

//actions
export type tableActionsType = ReturnType<typeof editTable> | ReturnType<typeof editTableSucses>
    | ReturnType<typeof clearEdditTabler>
    | ReturnType<typeof AddNewTable>
    | ReturnType<typeof editValueRow>
    | ReturnType<typeof addSearchStatus>
    | ReturnType<typeof addSearchTotal>
    | ReturnType<typeof fetchCandidatesPack>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setTotalCount>


export const TableReducer = (state: TableTypeInit = initialState, action: tableActionsType): TableTypeInit => {
    switch (action.type) {

        case ActionType.EDIT_TABLE_ROW:

            const fileredArray = state.rows.filter(a => action.ArrayId.includes(a.id))
           return {...state, edditRows: fileredArray}

        case ActionType.EDIT_TABLE_ROW_SUCSESS:
            const newArray = state.rows.map((row: TableRowType) => row._id ===action.row._id ?  action.row : row)
            return {...state, rows:[...newArray]}
        case ActionType.CLEAR_EDIT_TABLE:
            return {...state, edditRows: state.edditRows?.filter(tl => tl._id !== action.rowId)}
        case ActionType.ADD_NEW_TABLE:
            return {...state, rows:[...state.rows, action.row]}
        case ActionType.EDIT_VALUE_ROW:

            const newArr = state.rows.map((el:TableRowType) => el._id === action.id ? {...el, recommendation: action.value} : el)
            return {...state, rows:[...newArr]}
        case ActionType.ADD_SEARCH_STATUS:
            return {...state, searchStatus: action.value}
        case ActionType.ADD_SEARCH_TOTAL:
            return {...state, searchTotal: action.value}
        case ActionType.FETCH_CANDIDATES_PACK:
            return {...state, rows:[...action.candidatesPack]}
        case ActionType.SET_FETCH_STATUS:
            return {...state, status: action.status}
        case ActionType.SET_TOTAL_COUNT:
            return {...state, totalPacks: action.totalCount}
        default:
            return state


    }
}

export const editTable = (ArrayId:string[]) => ({type:ActionType.EDIT_TABLE_ROW, ArrayId} as const)
export const editTableSucses = (row:TableRowType) => ({type:ActionType.EDIT_TABLE_ROW_SUCSESS, row} as const)
export const AddNewTable = (row:TableRowType) => ({type:ActionType.ADD_NEW_TABLE, row} as const)

export const clearEdditTabler = (rowId: string) => ({type: ActionType.CLEAR_EDIT_TABLE,rowId} as const)
export const editValueRow = (value: string, id:string) => {

    return {type: ActionType.EDIT_VALUE_ROW,value, id} as const
}
export const addSearchStatus = (value: string) => ({type: ActionType.ADD_SEARCH_STATUS,value} as const)
export const addSearchTotal = (value: string) => ({type: ActionType.ADD_SEARCH_TOTAL,value} as const)
const fetchCandidatesPack = (candidatesPack:TableRowType[]) => ({type:ActionType.FETCH_CANDIDATES_PACK, candidatesPack} as const)
const setStatus = (status:RequestStatusType) => ({type:ActionType.SET_FETCH_STATUS, status} as const)
const setTotalCount= (totalCount:number) => ({type:ActionType.SET_TOTAL_COUNT, totalCount} as const)


export const getPacksThunk = (user_id: string, ) => async (dispatch: ThunkDispatch<AppRootStateType, {}, AppActionType>,getState: () => AppRootStateType) => {
    dispatch(setStatus(StatusFetchEnum.LOADING))
    dispatch(setDisabledBtn(true))
    const packName = ''
    const searchStatus = getState().tableRows.searchStatus
    const searchTotal = getState().tableRows.searchTotal
    try {
        const res =await ApiCandidatePack.getCandidatesPack(user_id, packName, searchStatus, searchTotal)
        dispatch(fetchCandidatesPack(res.data.candidatesPacks))
        dispatch(setTotalCount(res.data.totalPacks))
        dispatch(setStatus(StatusFetchEnum.OK))

    }catch (e) {
        const error =  e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log(error)
        console.log('errors:', {...e})

    }finally {
        dispatch(setDisabledBtn(false))
    }

}


