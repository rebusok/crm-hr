import React from 'react';
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
import {PositionEnum} from "../../store/TableReducer/TableType";

const Row = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow >
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    Должности
                </TableCell>
                <TableCell align="right">Всего кандидатов</TableCell>
                <TableCell align="right">Отказ</TableCell>
                <TableCell align="right">Вышли</TableCell>
                <TableCell align="right">Процент</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/*{rowsStatist.map((statisticRow) => (*/}
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Чтото тут
                                            </TableCell>
                                            <TableCell>ЙДТИ</TableCell>
                                            <TableCell align="right">ХРЕН</TableCell>
                                            <TableCell align="right">
                                                чтото там
                                            </TableCell>
                                        </TableRow>
                                    {/*))}*/}
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