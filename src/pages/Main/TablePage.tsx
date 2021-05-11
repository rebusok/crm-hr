import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Checkbox, CircularProgress, TextField} from "@material-ui/core";
import EnhancedTableToolbar from "./EnhancedTableToolbar ";
import style from './TablePage.module.scss'
import {Order, OrderEnum, SortEnum, StatusFetchEnum, TableRowType} from '../../store/TableReducer/TableType';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import EditableSpanText from "../../components/EditableSpanText/EditableSpanText";
import TableHeader from "../../components/TableHeader/TableHeader";
import TablePaginationActions from '../../components/TablePaginator/TablePaginator';
import {currentDate, currentyTime, setYear, smartSorting} from "../../helper/helper";
import {editRecommendationValue, getPacksThunk, updatePack} from "../../store/TableReducer/TableReducer";
import {Redirect} from 'react-router-dom';
import {RoutingType} from "../../routes/Routes";




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


const TablePage = () => {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selected, setSelected] = React.useState<string[]>([]);
    const [order, setOrder] = React.useState<Order>(OrderEnum.ASC);
    const [orderBy, setOrderBy] = React.useState<string>('name');
    const [typeSort, setTypeSort] = React.useState<string>('string');
    const [searchName, setSearchName] = useState<string>('')
    const [currentsearchName, setCurrentSearchName] = useState<string>('')

    const {status, searchTotal, searchStatus, rows} = useSelector((state: AppRootStateType) => state.tableRows)
    const {disabledBtn} = useSelector((state: AppRootStateType) => state.app)
    const {isLogin} =  useSelector((state: AppRootStateType) => state.auth)
    const profile = useSelector((state: AppRootStateType) => state.profile.profile)
    const dispatch = useDispatch();
    const stableDispatch = useCallback(dispatch, [dispatch])
    // selected

    useEffect(() => {
        if(isLogin && profile)stableDispatch(getPacksThunk(profile._id))
        else return
    }, [searchTotal, searchStatus, stableDispatch, isLogin, profile])

    if( ! isLogin) {
        return <Redirect to={RoutingType.LOGIN}/>
    }
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n: TableRowType) => n.name);
            console.log(newSelecteds)
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


    const changeInputSsHandler = (ssValue:string, id:string) => {
        console.log(ssValue)
        const currentSs = setYear(ssValue.split('.').join('-'))
        console.log(currentSs)
        if (currentSs !== null) {
            dispatch(updatePack({SS:currentSs, _id: id}))
        }
    }

    const searchHangler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchName(e.currentTarget.value)
    }
    const filteredByName = rows.filter(el => {
        return el.name.toLowerCase().includes(currentsearchName.toLowerCase())
    })
    const changeInputRecHandler = (recommendation: string, id: string) => {
        dispatch(updatePack({recommendation, _id: id}))
        console.log(recommendation, id)
        dispatch(editRecommendationValue(recommendation, id))
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
                        order={order}

                    />
                    {status === StatusFetchEnum.LOADING ?
                        <TableBody>
                            <TableRow>
                                <TableCell style={{width: 100}}>
                                    <div className={style.divSpinner}><CircularProgress/></div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        : <TableBody>
                            {(rowsPerPage > 0
                                    ? smartSorting(filteredByName, typeSort, order, orderBy).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : smartSorting(filteredByName, typeSort, order, orderBy)
                            ).map((row, index) => {
                                    const isItemSelected = isSelected(row._id);

                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (

                                        <TableRow key={row._id}
                                                  tabIndex={-1}
                                                  role="checkbox"
                                                  hover
                                                  selected={isItemSelected}

                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    disabled={disabledBtn}
                                                    inputProps={{'aria-labelledby': labelId}}
                                                    onClick={(event) => handleClick(event, row._id)}
                                                />
                                            </TableCell>
                                            <TableCell style={{width: 100}} component="th" scope="row" id={labelId}
                                                       align="center">
                                                {currentDate.format(new Date(row.date))}
                                            </TableCell>
                                            <TableCell style={{width: 60}} align="center">
                                                {currentyTime.format(new Date(row.date))}
                                            </TableCell>
                                            <TableCell style={{width: 80}} align="center">
                                                {row.position}
                                            </TableCell>
                                            <TableCell style={{width: 100}} align="center">
                                                {row.name}
                                            </TableCell>
                                            <TableCell style={{width: 100}} align="center">
                                                {row.meeting ? <span>yes</span> : <span>No</span>}
                                            </TableCell>
                                            <TableCell style={{width: 160}} align="center">
                                                {row.status}
                                            </TableCell>
                                            <TableCell style={{width: 160}} align="left">
                                                <EditableSpanText
                                                    value={row.recommendation}
                                                    idRow={row._id}
                                                    blured={true}
                                                    onChanges={changeInputRecHandler}
                                                    typeSpan={SortEnum.STRING}
                                                />

                                            </TableCell>
                                            <TableCell style={{width: 100}} align="center">
                                                {row.leaderInterview ? <span>yes</span> : <span>No</span>}
                                            </TableCell>
                                            <TableCell style={{width: 160}} align="center">
                                                {row.total}
                                            </TableCell>
                                            <TableCell style={{width: 160}} align="center">
                                                <EditableSpanText
                                                    value={row.SS ? row.SS.slice(0, 10).split('-').join('.') : ''}
                                                    blured={true}
                                                    onChanges={changeInputSsHandler}
                                                    idRow={row._id}
                                                    typeSpan={SortEnum.DATE}
                                                />

                                            </TableCell>

                                        </TableRow>
                                    )
                                }
                            )}

                        </TableBody>
                    }

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
            <TextField id="standard-basic" label="Standard" onChange={(e) => searchHangler(e)} value={searchName}/>

        </Paper>

    );
}
export default TablePage