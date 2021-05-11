import {AppRootStateType} from "../store/store";

export const selectDisableBtn = (state:AppRootStateType) => state.app.disabledBtn
