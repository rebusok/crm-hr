import {useStyles} from "@material-ui/x-grid-data-generator/dist/cjs/_modules_/grid/components/containers/GridRootStyles";
import React from "react";
import {Order, OrderEnum, StatusEnum, StatusType, TypeSort} from "../../store/TableReducer/TableType";
import {IconButton, TableHead} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {headCells} from "../../data";
import style from "../../pages/Main/TablePage.module.scss";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import FilterListIcon from '@material-ui/icons/FilterList';
import SelectedHeader from "../selected/SelectedHeader";

interface EnhancedTableProps {
    classes?: ReturnType<typeof useStyles>;
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
    onRequestSort: (typeSorting: string, sortByValue: Order, keyValue: string) => void;
    order: Order,
    filtered: boolean,
    setBooleanFilter: (filterdBoolean: boolean) => void
    setOptionsHeadStatus: (optionsValue:StatusType | '') => void
    optionsHeadStatus: StatusType | ''
}


function TableHeader(props: EnhancedTableProps) {
    const {onRequestSort, setBooleanFilter, filtered, setOptionsHeadStatus, optionsHeadStatus} = props;
    const optionsArray = [StatusEnum.OK, StatusEnum.NO, StatusEnum.THINK]
    function handlerSorting(typeSorting: TypeSort | null, sortByValue: Order, keyValue: string) {
        if (typeSorting === null) return

        onRequestSort(typeSorting, sortByValue, keyValue)
    }
    const fileredBooleanHandler = () => {
        setBooleanFilter(!filtered)
        setOptionsHeadStatus('')
    }
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'left' :filtered ? 'left' : 'center'}

                    >
                        <div className={`${style.divHeader}  ${headCell.fillterHead && filtered  ? style.flexLeft : ''}`}>
                            {headCell.label}
                            <div className={`${style.wrappedFilter}`}>
                                {headCell.fillterHead ?
                                    <>
                                    <div className={filtered? style.open : style.close}>
                                        <IconButton aria-label="delete" onClick={fileredBooleanHandler} >
                                            <FilterListIcon fontSize={'small'}/>
                                        </IconButton>

                                    </div>
                                        <SelectedHeader filtered={filtered} optionsArray={optionsArray} optionsHeadStatus={optionsHeadStatus} setOptionsHeadStatus={setOptionsHeadStatus}/>
                                    </>
                                    : null
                                }

                            </div>
                            {headCell.sorting
                                ? props.order === OrderEnum.ASC
                                    ? <div>
                                        <IconButton aria-label="delete"
                                                    onClick={() => handlerSorting(headCell.typeSorting, OrderEnum.DESK, headCell.id)}>
                                            <ArrowDownwardIcon fontSize={'small'}/>
                                        </IconButton>

                                    </div>
                                    : <div>
                                        <IconButton aria-label="delete"
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