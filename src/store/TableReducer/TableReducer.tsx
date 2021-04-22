import {TableRowType} from './TableType'
import {rows} from "../../data";






const initialState: TableRowType[] = rows


//Type
export enum ActionType {
    EDIT_TABLE_ROW = 'EDIT_TABLE_ROW',

}

//actions
export type EditTableType = ReturnType<typeof setInitialApp>


export const TableReducer = (state: TableRowType[] = initialState, action: EditTableType): TableRowType[] => {
    switch (action.type) {
        case ActionType.EDIT_TABLE_ROW:
            if (state) {
                const {id} = action.payload.editRow
                let newArray = state.map(item => {
                    if (id === item.id) {
                        return {...item, ...action.payload as {}}
                    } else {
                        return  item
                    }
                })
                return {...state, ...newArray
                }
            } else {
                return state
            }
        default:
            return state
    }
}

export const setInitialApp = (editRow:TableRowType) => ({type:ActionType.EDIT_TABLE_ROW, payload:{editRow}})
