import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Checkbox} from "@material-ui/core";
import EnhancedTableToolbar from "./EnhancedTableToolbar ";
import {Order, OrderEnum, SortEnum, TableRowType} from '../../store/TableReducer/TableType';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import EditableSpanText from "../../components/EditableSpanText/EditableSpanText";
import TableHeader from "../../components/TableHeader/TableHeader";
import TablePaginationActions from '../../components/TablePaginator/TablePaginator';


const useStyles2 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },        
    }),
);




export default function CustomPaginationActionsTable() {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selected, setSelected] = React.useState<string[]>([]);
    const rows = useSelector((state: AppRootStateType) => state.tableRows)
    const [order, setOrder] = React.useState<Order>(OrderEnum.DESK);
    const [orderBy, setOrderBy] = React.useState<string>('name');
    const [typeSort, setTypeSort] = React.useState<string>('string');
    // selected

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const testSotr = (typeSorting: string, sortByValue: Order, keyValue: string) => {
        setTypeSort(typeSorting)
        setOrder(sortByValue)
        setOrderBy(keyValue)

    }
    const smartSorting = (rows: TableRowType[], typeSorting: string, sortByValue: Order, keyValue: string ) => {

        if (typeSorting === SortEnum.NUMBER) {
            sortByValue === OrderEnum.ASC
                ? rows.sort(function (a, b) {
                    return b[keyValue] - a[keyValue]
                })
                : rows.sort(function (a, b) {
                    return a[keyValue] - b[keyValue]
                })
        }
        if (typeSorting === SortEnum.STRING) {
            sortByValue === OrderEnum.ASC
                ? rows.sort(function (a, b) {

                    if (a[keyValue].toLowerCase() < b[keyValue].toLowerCase()) //сортируем строки по возрастанию
                        return -1
                    if (a[keyValue].toLowerCase() > b[keyValue].toLowerCase())
                        return 1
                    return 0
                })
                : rows.sort(function (a, b) {
                    if (a[keyValue].toLowerCase() > b[keyValue].toLowerCase()) //сортируем строки по возрастанию
                        return -1
                    if (a[keyValue].toLowerCase() < b[keyValue].toLowerCase())
                        return 1
                    return 0
                })
        }
        if (typeSorting === SortEnum.DATE) {

            sortByValue === OrderEnum.ASC
                ? rows.sort(function (a, b) {
                    const dateA = new Date(a[keyValue]).getTime(),
                        dateB = new Date(b[keyValue]).getTime()

                    return dateB - dateA
                })
                : rows.sort((a, b) => {
                    const dateA = new Date(a[keyValue]).getTime(),
                        dateB = new Date(b[keyValue]).getTime()
                    return dateA - dateB

                })
        }
        if (typeSorting === SortEnum.BOOLEAN) {
            sortByValue === OrderEnum.ASC
                ? rows.sort(function (a, b) {
                    return (a[keyValue] === b[keyValue]) ? 0 : a[keyValue] ? -1 : 1;
                })
                : rows.sort(function (a, b) {
                    return (a[keyValue] === b[keyValue]) ? 0 : a[keyValue] ? 1 : -1;
                })
        }
        return rows
    }

    const testHandler = () => {

        console.log(selected)


    }
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    return (
        <Paper>
            <EnhancedTableToolbar numSelected={selected.length} selected={selected} setSelected={setSelected}/>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHeader
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={rows.length}
                        numSelected={selected.length}
                        onRequestSort={testSotr}
                        classes={classes}
                    />
                    <TableBody>
                        {(rowsPerPage > 0
                                ? smartSorting(rows, typeSort, order, orderBy).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : smartSorting(rows, typeSort, order, orderBy)
                        ).map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (

                                    <TableRow key={row.name}
                                              tabIndex={-1}
                                              role="checkbox"
                                              hover
                                              selected={isItemSelected}

                                    >
                                        <TableCell padding="checkbox" >
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{'aria-labelledby': labelId}}
                                                onClick={(event) => handleClick(event, row.id)}
                                            />
                                        </TableCell>
                                        <TableCell style={{width: 160}} component="th" scope="row" id={labelId}>
                                            {row.date}
                                        </TableCell>
                                        <TableCell style={{width: 160}} align="right">
                                            {row.time}
                                        </TableCell>
                                        <TableCell style={{width: 160}} align="right">
                                            {row.position}
                                        </TableCell>
                                        <TableCell style={{width: 160}} align="right">
                                            {row.name}
                                        </TableCell>
                                        <TableCell style={{width: 160}} align="right">
                                            {row.meeting ? <span>yes</span> :  <span>No</span>}
                                        </TableCell>
                                        <TableCell style={{width: 160}} align="right">
                                        {row.status}
                                    </TableCell>
                                        <TableCell style={{width: 160}} align="right">
                                            <EditableSpanText
                                                value={row.recommendation}
                                                blured={true}
                                                onChanges={testHandler}
                                                typeSpan={SortEnum.STRING}
                                            />

                                        </TableCell>
                                        <TableCell style={{width: 160}} align="right">
                                            <EditableSpanText
                                                value={row.SS ? row.SS.slice(0, 10).split('-').join('.') :  ''}
                                                blured={true}
                                                onChanges={testHandler}
                                                typeSpan={SortEnum.DATE}
                                            />

                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        )}

                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                colSpan={9}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

        </Paper>

    );
}