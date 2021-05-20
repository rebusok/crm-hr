import React, {FC} from 'react';
import {Box, Button, Collapse, Typography} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {PositionEnum, PositionType, TableRowType} from "../../store/TableReducer/TableType";
import Row from "./Row";
import cls from './MappedStatistic.module.scss'


interface PropsType {
    rowsStatist: TableRowType []
    budget: number
}

const createDate = (positionArray: PositionType[], rows: TableRowType []) => {
    return positionArray.map(el => {
        const filteredArray = rows.filter(row => el === row.position)
        const totalComing = filteredArray.filter(row => row.meeting)
        const totalSucsesStatus = totalComing.filter(row =>  row.status !== 'отказ')
        const totalSucsesTotal = totalSucsesStatus.filter(row => row.total === 'Выход на работу' || row.total === 'Стажировка')
        const totalCommingJob = totalSucsesTotal.filter(row => row.total === 'Выход на работу')


        return {
            position: el,
            totalPosition: filteredArray.length,
            totalComming: totalComing.length,
            totalSucsesStatus: totalSucsesStatus.length,
            totalSucsesTotal: totalSucsesTotal.length,
            totalCommingJob: totalCommingJob.length,
            arrayCandidate: filteredArray
        }
    })

}

export type typeDateRows = [
    {
        arrayCandidate: TableRowType []
        no: number
        position: PositionType
        totalPosition: number
        yes: number
    }
]
const createTotal = (rows: typeDateRows) => {
    // @ts-ignore
    return rows.reduce((acc, cur) => {
        return {
            totalPosition: acc.totalPosition + cur.totalPosition,
            yes: acc.yes + cur.yes,
            no: acc.no + cur.no
        }
    })

}

const MappedStatistic: FC<PropsType> = ({rowsStatist, budget}) => {
    const [open, setOpen] = React.useState(false);
    const optionsArrayPosition = [PositionEnum.KARATIST, PositionEnum.SLESAR, PositionEnum.PRESIDENT, PositionEnum.TRACTORIS]
    const finDat = createDate(optionsArrayPosition, rowsStatist)
    console.log(finDat)
    // const totalPosition = createTotal(finDat as typeDateRows)

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setOpen(!open)}>
                {!open ? "Развернуть" : "Свернуть"}
            </Button>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                        Статистика с дата до дата
                    </Typography>
                    <Paper>
                        <div className={cls.wrappItem}>
                            {finDat.map(row => {
                                return (
                                    <Row key={row.position} statisticPosition={row}/>
                                )
                            })}
                        </div>
                        <div>
                            ВСЕЕГО
                        </div>
                    </Paper>
                </Box>
            </Collapse>

        </>
    );
};

export default MappedStatistic;