import React, {FC} from 'react';
import {
    Box,
    Button,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {PositionEnum, PositionType, TableRowType} from "../../store/TableReducer/TableType";
import Row from "./Row";

interface PropsType {
    rowsStatist: TableRowType []
}

const createDate = (positionArray: PositionType[], rows: TableRowType []) => {
    return positionArray.map(el => {
        const filteredArray = rows.filter(row => el === row.position)
        const no = filteredArray.filter(row => row.status !== 'подошел' || row.total !== 'Выход на работу')
        return {
            position: el,
            totalPosition: filteredArray.length,
            no: no.length,
            yes: filteredArray.length - no.length,
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

const MappedStatistic: FC<PropsType> = ({rowsStatist}) => {
    const [open, setOpen] = React.useState(false);
    const optionsArrayPosition = [PositionEnum.KARATIST, PositionEnum.SLESAR, PositionEnum.PRESIDENT, PositionEnum.TRACTORIS]
    const finDat = createDate(optionsArrayPosition, rowsStatist)
    const totalPosition = createTotal(finDat as typeDateRows)

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setOpen(!open)}>
                {!open ? "Развернуть" : "Свернуть"}
            </Button>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                        Заголовок
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3}>

                                    </TableCell>
                                    <TableCell align="left">
                                        Details
                                    </TableCell>
                                    <TableCell align="left">
                                        Details
                                    </TableCell>
                                    <TableCell align="center">Price</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell>Кандидаты</TableCell>
                                    <TableCell align="right">Всего по должности</TableCell>
                                    <TableCell align="right">Отказ</TableCell>
                                    <TableCell align="right">Вышли</TableCell>
                                    <TableCell align="right">Процент</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {finDat.map(row => {
                                    return (
                                        <Row key={row.position} statisticPosition={row}/>
                                    )
                                })}
                                <TableRow>
                                    <TableCell rowSpan={3}/>
                                    <TableCell colSpan={1}>Всего</TableCell>
                                    <TableCell align="right">{totalPosition.totalPosition}</TableCell>
                                    <TableCell align="right">{totalPosition.no}</TableCell>
                                    <TableCell align="right">{totalPosition.yes}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell rowSpan={2}/>
                                    <TableCell rowSpan={1}/>
                                    <TableCell rowSpan={1}/>
                                    <TableCell align="right">ПРОЦЕНТ</TableCell>

                                    <TableCell align="right">ПРОЦЦЕНТ</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}/>
                                    <TableCell align="right">ЕЩЕ ПРОЦЕНТ</TableCell>
                                    <TableCell align="right">ЦИФРАА</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Collapse>

        </>
    );
};

export default MappedStatistic;