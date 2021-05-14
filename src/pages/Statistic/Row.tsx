import React, {FC} from 'react';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {PositionType, TableRowType} from "../../store/TableReducer/TableType";


type PropsTypeArray =
    {
        arrayCandidate: TableRowType []
        no: number
        position: PositionType
        totalPosition: number
        yes: number
    }

type PropsType = {
    statisticPosition: PropsTypeArray
}

const Row:FC<PropsType> = ({statisticPosition}) => {
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {statisticPosition.position}
                </TableCell>
                <TableCell align="right">{statisticPosition.totalPosition}</TableCell>
                <TableCell align="right">{statisticPosition.no}</TableCell>
                <TableCell align="right">{statisticPosition.yes}</TableCell>
                <TableCell align="right">Процент</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Подробнее
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ФИО</TableCell>
                                        <TableCell>ИТОГ</TableCell>
                                        <TableCell align="right">ИТОГ2.0</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {statisticPosition.arrayCandidate.map(row => {
                                        return (
                                            <TableRow key={row._id}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>{row.status}</TableCell>
                                                <TableCell align="right">{row.total}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default Row;