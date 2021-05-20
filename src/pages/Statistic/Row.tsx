import React, {FC, useState} from 'react';
import {Button, Collapse, IconButton, Paper, TextField} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {PositionType, TableRowType} from "../../store/TableReducer/TableType";
import cls from './Row.module.scss'


type PropsTypeArray =
    {
        [key: string]: any
        arrayCandidate: TableRowType []
        totalComming: number
        position: PositionType
        totalPosition: number
        totalCommingJob: number
        totalSucsesStatus: number
        totalSucsesTotal: number

    }

type PropsType = {

    statisticPosition: PropsTypeArray
}

const Row:FC<PropsType> = ({statisticPosition}) => {
    const [open, setOpen] = React.useState(false);
    const [budget, setBudget] = useState<number>(0)
    const [currentBudjet, setCurrentBudjet] = useState<number>(0)
    const [openSiting, setOpenSiting] = useState<boolean>(false)
    const mappedKeys = Object.keys(statisticPosition).filter(el =>  el !== 'position' && el !== "arrayCandidate")
    const changeHandlerBudget= (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setBudget(+e.currentTarget.value)
    }
    const onClickHandler = () => {
        setCurrentBudjet(budget)
    }
    const procentNum = (num: number) => {
        if(num === 0) return 0
       return  Math.round(currentBudjet / num)
    }
    const mathProcent = (current: number) => {
        if(statisticPosition.totalPosition === 0) return 0
        return Math.round( (current / statisticPosition.totalPosition ) * 100)
    }
    const onCollapsedHandler = () => {
        setOpenSiting(!openSiting)
    }

    return (
        <React.Fragment>
            <Paper className={cls.main}>
                <div>
                    {statisticPosition.position}
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>

                    <div className={cls.siting}>
                        {currentBudjet <= 0 ? <span>Бюджет не установлен</span> : <span>Потрачено: {currentBudjet}</span>}

                        <Button onClick={onCollapsedHandler}>установить Бюджет</Button>
                    </div>
                    <Collapse in={openSiting} timeout="auto" component={'div'}>
                        <TextField
                            className={cls.input}
                            id="budget"
                            label="Бюджет"
                            type="number"
                            defaultValue={budget}
                            onChange={event => changeHandlerBudget(event)}
                        />
                        <Button onClick={onClickHandler}>Save</Button>
                    </Collapse>
                </div>
                <Collapse in={open} timeout="auto" component={'div'}>

                    <Paper className={cls.statisticWrap}>
                        <div className={cls.wrapTitle}>
                            <div>Сколько приглашено</div>
                            <div>Сколько пришло</div>
                            <div>Сколько подошло</div>
                            <div>Сколько одобрено руководителем</div>
                            <div>Сколько вышло на работу</div>
                        </div>
                        <div className={cls.numWrap}>
                            {mappedKeys.map(el => {

                                return (
                                    <div className={cls.numStatistic} key={el}>
                                        <div>{statisticPosition[el]}</div>
                                        <div>{mathProcent(statisticPosition[el])}%</div>
                                        <div className={cls.currentBudget}>{currentBudjet <= 0 ? <span>Установите бюджет</span>  : <span >{procentNum(statisticPosition[el])} ₽</span>}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </Paper>


                </Collapse>
            </Paper>
        </React.Fragment>
    );
};

export default Row;