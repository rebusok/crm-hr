import React, {FC, useCallback, useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {setFiler} from "../../../store/statisticReducer/statisticReducer";
import MappedStatistic from "../MappedStatistic/MappedStatistic";
import {getPacksThunk} from "../../../store/TableReducer/TableReducer";
import {AppRootStateType} from "../../../store/store";
import {TableRowType} from "../../../store/TableReducer/TableType";
import {getRowArray} from "../../../utils/selectors";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import cls from './StatisticOneTable.module.scss'


interface PropsType {
    id: string,
    rowsStatist: TableRowType [] | []
}

const StatisticOneTable: FC<PropsType> = ({id, rowsStatist}) => {
    const [first, setFirst] = useState<boolean>(true)
    const [startSelectedDate, setStartSelectedDate] = React.useState<Date | null>();
    const [finishSelectedDate, setFFfinishStartSelectedDate] = React.useState<Date | null>();
    const test = useSelector((state: AppRootStateType) => state.statistic)
    console.log(test)
    console.log(id)
    const rows = useSelector(getRowArray)
    const dispatch = useDispatch()
    const stableDispatch = useCallback(dispatch, [dispatch])
    const {isLogin} = useSelector((state: AppRootStateType) => state.auth)
    const profile = useSelector((state: AppRootStateType) => state.profile.profile)
    const changeHandlerStart = (date: Date | null) => {
        setStartSelectedDate(date)
    }
    const changeHandlerFinish = (date: Date | null) => {
        setFFfinishStartSelectedDate(date)
    }
    const filterHandler = () => {
        if (finishSelectedDate && startSelectedDate) {
            const ffilter = rows.filter(el => el.date <= finishSelectedDate.toISOString() && el.date >= startSelectedDate.toISOString())
            dispatch(setFiler(ffilter, id))
        }
        setFirst(false)
    }

    useEffect(() => {
        if (isLogin && profile && rows.length === 0) stableDispatch(getPacksThunk(profile._id))
        else return
    })
    return (
        <div>

            <div className={cls.siting}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-start"
                        label="C"
                        format="MM.dd.yyyy"
                        autoOk
                        clearable
                        disableFuture
                        value={startSelectedDate}
                        onChange={changeHandlerStart}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-finish"
                        label="До"
                        autoOk
                        clearable
                        disableFuture
                        format="MM.dd.yyyy"
                        value={finishSelectedDate}
                        onChange={changeHandlerFinish}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <Button onClick={filterHandler} variant="contained" color="primary" size={'small'}>Сформировать</Button>
            </div>
            <div>
                {rowsStatist && rowsStatist.length > 0
                    ? <MappedStatistic rowsStatist={rowsStatist} id={id} dateStart={startSelectedDate}
                                       dateFin={finishSelectedDate}/>
                    : null
                }

                {first && rowsStatist && rowsStatist.length === 0
                    ? null
                    : startSelectedDate && finishSelectedDate ?
                        null
                        : rowsStatist && rowsStatist.length > 0 ?
                            <h2>Заполните поля</h2>
                            : null
                }
            </div>
        </div>
    );
};

export default StatisticOneTable;