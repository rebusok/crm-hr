import {useStyles} from "@material-ui/x-grid-data-generator/dist/cjs/_modules_/grid/components/containers/GridRootStyles";
import React from "react";
import {Order, OrderEnum, PositionEnum, StatusEnum, TotalEnum, TypeSort} from "../../store/TableReducer/TableType";
import {IconButton, TableHead} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {headCells} from "../../data";
import style from "../../pages/Main/TablePage.module.scss";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import FilteredHeader from "./FilteredHeader";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {optionsArrayPosition, optionsArrayStatus, optionsArrayTotal} from "../../utils/ConstOptions";

interface EnhancedTableProps {
    classes?: ReturnType<typeof useStyles>;
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
    onRequestSort: (typeSorting: string, sortByValue: Order, keyValue: string) => void;
    order: Order,

}


function TableHeader(props: EnhancedTableProps) {
    const {onRequestSort } = props;

    const {disabledBtn} = useSelector((state: AppRootStateType) => state.app)


    function handlerSorting(typeSorting: TypeSort | null, sortByValue: Order, keyValue: string) {
        if (typeSorting === null) return

        onRequestSort(typeSorting, sortByValue, keyValue)
    }


    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'left' : "center" }

                    >

                        <div className={style.divHeader}>
                            {headCell.label}
                            <div className={`${style.wrappedFilter}`}>
                                {headCell.label === 'Итог' ?
                                    <>
                                        <FilteredHeader optionsArray={optionsArrayStatus} id={headCell.id}/>
                                    </>

                                    : null
                                }
                                {
                                    headCell.label === 'Итог2.0' ?
                                        <>
                                            <FilteredHeader optionsArray={optionsArrayTotal} id={headCell.id}/>
                                        </>

                                        : null
                                }
                                {
                                    headCell.label === 'Должность' ?
                                        <>
                                            <FilteredHeader optionsArray={optionsArrayPosition} id={headCell.id}/>
                                        </>

                                        : null
                                }

                            </div>
                            {headCell.sorting
                                ? props.order === OrderEnum.ASC
                                    ? <div>
                                        <IconButton aria-label="delete"
                                                    disabled={disabledBtn}
                                                    onClick={() => handlerSorting(headCell.typeSorting, OrderEnum.DESK, headCell.id)}>
                                            <ArrowDownwardIcon fontSize={'small'}/>
                                        </IconButton>

                                    </div>
                                    : <div>
                                        <IconButton aria-label="delete"
                                                    disabled={disabledBtn}
                                                    onClick={() => handlerSorting(headCell.typeSorting, OrderEnum.ASC, headCell.id)}>
                                            <ArrowUpwardIcon fontSize={'small'}/>
                                        </IconButton>
                                    </div>
                                : null
                            }
                        </div>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default TableHeader;