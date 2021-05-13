import React, {FC} from 'react';
import {tableStattistic} from "../../store/statisticReducer/statisticReducer";
import {
    Box, Button,
    Collapse, IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Paper from '@material-ui/core/Paper';
import {PositionEnum, PositionType, TableRowType} from "../../store/TableReducer/TableType";
import Row from "./Row";
interface PropsType {
    rowsStatist: TableRowType []
}
const createDate = (positionArray: PositionType[], rows:TableRowType []) => {
    return  positionArray.map(el => {
        const filteredArray = rows.filter(row => el === row.position)
        const no = filteredArray.filter(row => row.status !== 'подошел' ||  row.total !== 'Выход на работу')
        return {
            position: el,
            totalPosition: filteredArray.length,
            no: no.length,
            yes: filteredArray.length - no.length,
            arrayCandidate: filteredArray
        }
    })

}

type typeDateRows = [
    {
        arrayCandidate: TableRowType []
        no: number
        position: PositionType
        totalPosition: number
        yes: number
    }
]
const finData = (rows: typeDateRows) => {
   return  rows.map((row, index, array) => {
        return {
            ...row,
            mainstatistic: {
                total:array.reduce((acc, cur) => acc + cur.totalPosition, 0),
                ok:array.reduce((acc, cur) => acc + cur.yes, 0),
                no:array.reduce((acc, cur) => acc + cur.no, 0),
            }
        }
    })

}

const MappedStatistic:FC<PropsType> = ({rowsStatist}) => {
    const [open, setOpen] = React.useState(false);
    const optionsArrayPosition= [PositionEnum.KARATIST, PositionEnum.SLESAR, PositionEnum.PRESIDENT, PositionEnum.TRACTORIS]
    const finDat = finData(createDate(optionsArrayPosition,rowsStatist ) as typeDateRows)
    console.log(finDat)
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
                        <Table  aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3}>

                                    </TableCell>
                                    <TableCell align="left" >
                                        Details
                                    </TableCell>
                                    <TableCell align="left" >
                                        Details
                                    </TableCell>
                                    <TableCell align="center">Price</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
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
                                        <Row key={row.position}/>
                                    )
                                })}
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell rowSpan={3} />
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={2}>Subtotal</TableCell>
                                    <TableCell align="center">ЕЩЕЕ ХРЕНЬ</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>ПРОЦЕНТ</TableCell>
                                    <TableCell align="left">НИЧЕГО</TableCell>
                                    <TableCell align="center">ПРОЦЦЕНТ</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>ВСЕГО</TableCell>
                                    <TableCell align="center">ЦИФРАА</TableCell>
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