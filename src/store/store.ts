import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import {AppReducer, AppType} from "./appReducer/AppReducer";
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {EditTableType, TableReducer} from "./TableReducer/TableReducer";



const reducer = combineReducers({
    app: AppReducer,
    tableRows: TableReducer
})

const middleware = applyMiddleware(thunkMiddleware)



export const store = createStore(reducer, composeWithDevTools(middleware));



export type AppRootStateType = ReturnType<typeof reducer>
export type AppActionType = AppType | EditTableType



export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppActionType
    >

export default store

//@ts-ignore
window.store = store;