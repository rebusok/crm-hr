import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import {AppReducer, AppType} from "./appReducer/AppReducer";
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {tableActionsType, TableReducer} from "./TableReducer/TableReducer";
import AuthReducer, {AuthType} from "./AuthReducer/AuthReducer";
import ProfileReducer, {ActionProfileType} from "./AuthReducer/ProfileReducer";
import {statisticActionType, StatisticReducer} from "./statisticReducer/statisticReducer";



const reducer = combineReducers({
    app: AppReducer,
    tableRows: TableReducer,
    auth: AuthReducer,
    profile: ProfileReducer,
    statistic:StatisticReducer
})

const middleware = applyMiddleware(thunkMiddleware)



export const store = createStore(reducer, composeWithDevTools(middleware));



export type AppRootStateType = ReturnType<typeof reducer>
export type AppActionType = AppType | tableActionsType | AuthType | ActionProfileType | statisticActionType



export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppActionType
    >

export default store

//@ts-ignore
window.store = store;