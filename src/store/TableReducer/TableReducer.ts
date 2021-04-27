import {TableRowType} from './TableType'
import {rows} from "../../data";


const initialState: TableTypeInit = {
    rows: rows,
    edditRows: []
}
type TableTypeInit = {
    rows: TableRowType[] | []
    edditRows: TableRowType[] | []
}

//Type
export enum ActionType {
    EDIT_TABLE_ROW = 'EDIT_TABLE_ROW',
    EDIT_TABLE_ROW_SUCSESS = 'EDIT_TABLE_ROW_SUCSESS',
    CLEAR_EDIT_TABLE = 'CLEAR_EDIT_TABLE',
    ADD_NEW_TABLE = 'ADD_NEW_TABLE',
    EDIT_VALUE_ROW = 'EDIT_VALUE_ROW'
}

//actions
export type EditTableType = ReturnType<typeof editTable> | ReturnType<typeof editTableSucses>
    | ReturnType<typeof clearEdditTabler>
    | ReturnType<typeof AddNewTable>
    | ReturnType<typeof editValueRow>


export const TableReducer = (state: TableTypeInit = initialState, action: EditTableType): TableTypeInit => {
    switch (action.type) {

        case ActionType.EDIT_TABLE_ROW:

            const fileredArray = state.rows.filter(a => action.ArrayId.includes(a.id))
           return {...state, edditRows: fileredArray}

        case ActionType.EDIT_TABLE_ROW_SUCSESS:
            const newArray = state.rows.map((row: TableRowType) => row.id ===action.row.id ?  action.row : row)
            return {...state, rows:[...newArray]}
        case ActionType.CLEAR_EDIT_TABLE:
            return {...state, edditRows: state.edditRows?.filter(tl => tl.id !== action.rowId)}
        case ActionType.ADD_NEW_TABLE:
            return {...state, rows:[...state.rows, action.row]}
        case ActionType.EDIT_VALUE_ROW:
            const newArr = state.rows.map((el:TableRowType) => el.id === action.id ? {...el, recommendation: action.value} : el)
            return {...state, rows:[...newArr]}
        default:
            return state


    }
}

export const editTable = (ArrayId:string[]) => ({type:ActionType.EDIT_TABLE_ROW, ArrayId} as const)
export const editTableSucses = (row:TableRowType) => ({type:ActionType.EDIT_TABLE_ROW_SUCSESS, row} as const)
export const AddNewTable = (row:TableRowType) => ({type:ActionType.ADD_NEW_TABLE, row} as const)

export const clearEdditTabler = (rowId: string) => ({type: ActionType.CLEAR_EDIT_TABLE,rowId} as const)
export const editValueRow = (value: string, id:string) => ({type: ActionType.EDIT_VALUE_ROW,value, id} as const)


