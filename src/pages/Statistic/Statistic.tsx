import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getStatistic} from "../../utils/selectors";
import StatisticOneTable from "./StatisticOneTable";
import {Button} from "@material-ui/core";
import cls from './Statistic.module.scss'
import {addNewStatisticTable} from "../../store/statisticReducer/statisticReducer";


const Statistic = () => {
    const statisticArray = useSelector(getStatistic)
    const dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(addNewStatisticTable())
    }


    return (
        <div className={cls.main}>
            <h1>Статистика</h1>
            <div className={cls.title}>

                <Button variant="contained" color="primary" onClick={onClickHandler}>Добавить период</Button>
            </div>
            <div className={cls.content}>
                {statisticArray  && statisticArray.length > 0
                    ? statisticArray.map((el) => {
                        return (
                            <StatisticOneTable key={el.id} id={el.id} rowsStatist={el.rowStatist}/>
                        )
                    })
                    : <div>Статистика пуста добавьте период</div>
                }
            </div>
        </div>
    );
}

export default Statistic;