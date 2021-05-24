import {AppRootStateType} from "../store/store";

export const selectDisableBtn = (state:AppRootStateType) => state.app.disabledBtn
export const getRowArray = (state:AppRootStateType) => state.tableRows.rows;
export const getStatistic = (state:AppRootStateType) => state.statistic.statisticArray;
export const disableBtn = (state: AppRootStateType) => state.app.disabledBtn
export const isLoginSelect = (state: AppRootStateType) => state.auth