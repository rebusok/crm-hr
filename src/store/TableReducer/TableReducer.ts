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

}

//actions
export type EditTableType = ReturnType<typeof editTable> | ReturnType<typeof editTableSucses>| ReturnType<typeof clearEdditTabler>


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
        default:
            return state


    }
}

export const editTable = (ArrayId:string[]) => ({type:ActionType.EDIT_TABLE_ROW, ArrayId} as const)
export const editTableSucses = (row:TableRowType) => ({type:ActionType.EDIT_TABLE_ROW_SUCSESS, row} as const)
export const clearEdditTabler = (rowId: string) => ({type: ActionType.CLEAR_EDIT_TABLE,rowId} as const)


