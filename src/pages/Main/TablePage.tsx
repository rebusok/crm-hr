import React, {useCallback, useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Box, createMuiTheme, ThemeProvider} from "@material-ui/core";
import EnhancedTableToolbar from "./EnhancedTableToolbar ";
import {Order, OrderEnum, TableRowType} from '../../store/TableReducer/TableType';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import TableHeader from "../../components/TableHeader/TableHeader";
import TablePaginationActions from '../../components/TablePaginator/TablePaginator';
import {getPacksThunk} from "../../store/TableReducer/TableReducer";
import {Redirect} from 'react-router-dom';
import {RoutingType} from "../../routes/Routes";
import RowMap from "./Row/RowMaped";
import {isLoginSelect} from "../../utils/selectors";


const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            root: {
                padding: '10px'
            }
        }
    }
});


const useStyles2 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            padding: '10px'
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


const TablePage = () => {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selected, setSelected] = React.useState<string[]>([]);
    const [order, setOrder] = React.useState<Order>(OrderEnum.ASC);
    const [orderBy, setOrderBy] = React.useState<string>('name');
    const [typeSort, setTypeSort] = React.useState<string>('string');
    const [currentSearchName, setCurrentSearchName] = useState<string>('')

    const {
        searchTotal,
        searchStatus,
        rows,
        searchPosition
    } = useSelector((state: AppRootStateType) => state.tableRows)

    const {isLogin} = useSelector(isLoginSelect)
    const profile = useSelector((state: AppRootStateType) => state.profile.profile)
    const dispatch = useDispatch();
    const stableDispatch = useCallback(dispatch, [dispatch])
    // selected
    useEffect(() => {
        if (isLogin && profile) stableDispatch(getPacksThunk(profile._id))
        else return
    }, [searchTotal, searchStatus, stableDispatch, isLogin, profile, searchPosition])


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n: TableRowType) => n.name);
            console.log(newSelecteds)
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClickSelect = (event: React.MouseEvent<unknown>, name: string) => {
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
    const onRequestSort = (typeSorting: string, sortByValue: Order, keyValue: string) => {
        setTypeSort(typeSorting)
        setOrder(sortByValue)
        setOrderBy(keyValue)

    }

    if (!isLogin) {
        return <Redirect to={RoutingType.LOGIN}/>
    }

    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    return (
        <Box margin={1}>
            <Paper>
                <ThemeProvider theme={theme}>
                    <EnhancedTableToolbar numSelected={selected.length} selected={selected} setSelected={setSelected}
                                          setCurrentSearchName={setCurrentSearchName}/>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="custom pagination table">
                            <TableHeader
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={rows.length}
                                numSelected={selected.length}
                                onRequestSort={onRequestSort}
                                classes={classes}
                                order={order}

                            />
                            <RowMap
                                rowsPerPage={rowsPerPage}
                                rows={rows}
                                currentSearchName={currentSearchName}
                                typeSort={typeSort}
                                order={order}
                                orderBy={orderBy}
                                page={page}
                                handleClickSelect={handleClickSelect}
                                isSelected={isSelected}
                            />

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
                </ThemeProvider>
            </Paper>
        </Box>
    );
}
export default TablePage