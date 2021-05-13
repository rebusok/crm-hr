import React, {FC, useCallback, useEffect, useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {changeFinDate, changeStartDate} from "../../helper/helper";
import {useDispatch, useSelector} from "react-redux";
import {setFiler} from "../../store/statisticReducer/statisticReducer";
import MappedStatistic from "./MappedStatistic";
import {getPacksThunk} from "../../store/TableReducer/TableReducer";
import {AppRootStateType} from "../../store/store";
import {TableRowType} from "../../store/TableReducer/TableType";
import {getRowArray} from "../../utils/selectors";

interface PropsType {
    id: string,
    rowsStatist: TableRowType [] | []
}
const StatisticOneTable: FC<PropsType> = ({id, rowsStatist}) => {
    const [start, setStart] = useState<string>('');
    const [finish, setFinish] = useState<string>('');
    const [first, setFirst] = useState<boolean>(true)
    const rows = useSelector(getRowArray)
    const dispatch = useDispatch()
    const stableDispatch = useCallback(dispatch, [dispatch])
    const {isLogin} =  useSelector((state: AppRootStateType) => state.auth)
    const profile = useSelector((state: AppRootStateType) => state.profile.profile)
    const changeHandlerStart = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setStart(changeStartDate(e.currentTarget.value))
    }
    const changeHandlerFinish = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFinish(changeFinDate(e.currentTarget.value))
    }
    const filterHandler = () => {
        const ffilter = rows.filter(el => el.date <= finish && el.date >= start)
        dispatch(setFiler(ffilter, id))
        setFirst(false)
    }
    useEffect(() => {
        if(isLogin && profile && rows.length === 0)stableDispatch(getPacksThunk(profile._id))
        else return
    })
    return (
        <div>

            <div>
                <TextField
                    id="date"
                    label="C"
                    type="date"
                    defaultValue={start}
                    onChange={event => changeHandlerStart(event)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="date"
                    label="До"
                    type="date"
                    defaultValue={finish}
                    onChange={event => changeHandlerFinish(event)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button onClick={filterHandler}>Сформировать</Button>
            </div>
            <div>
                {rowsStatist && rowsStatist.length > 0
                    ? <MappedStatistic rowsStatist={rowsStatist}/>
                    : first
                        ? null
                        : <h2>За выбранный период нет данных</h2>
                }
            </div>
        </div>
    );
};

export default StatisticOneTable;