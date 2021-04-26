import {useStyles} from "@material-ui/x-grid-data-generator/dist/cjs/_modules_/grid/components/containers/GridRootStyles";
import React, {useState} from "react";
import {
    Order,
    OrderEnum,
    StatusEnum,
    StatusType,
    TotalEnum,
    TotalType,
    TypeSort
} from "../../store/TableReducer/TableType";
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
    setOptionsHeadStatus: (optionsValue: StatusType | '' | TotalType) => void
    optionsHeadStatus: StatusType | '' | TotalType
}


function TableHeader(props: EnhancedTableProps) {
    const {onRequestSort, setOptionsHeadStatus, optionsHeadStatus} = props;
    const optionsArrayStatus = [StatusEnum.OK, StatusEnum.NO, StatusEnum.THINK]
    const optionsArrayTotal = [TotalEnum.OFER, TotalEnum.CANSEL, TotalEnum.CANSEL_LID, TotalEnum.TRANING]
    const [bolleanFillerStatus, setBooleanFilterStatus] = useState<boolean>(false)
    const [bolleanFillerTotal, setBooleanFilterTotal] = useState<boolean>(false)

    function handlerSorting(typeSorting: TypeSort | null, sortByValue: Order, keyValue: string) {
        if (typeSorting === null) return

        onRequestSort(typeSorting, sortByValue, keyValue)
    }

    const fileredBooleanHandlerStatus = () => {
        setBooleanFilterStatus(!bolleanFillerStatus)
        setOptionsHeadStatus('')
    }
    const fileredBooleanHandlerTotal = () => {
        setBooleanFilterTotal(!bolleanFillerTotal)
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
                        align={headCell.numeric ? 'left' : bolleanFillerStatus ? 'left' : 'center'}

                    >
                        {/* eslint-disable-next-line no-mixed-operators */}
                        <div


                            className={`${style.divHeader}  ${headCell.fillterHead && bolleanFillerStatus ? style.flexLeft : ''} ${headCell.fillterHead && bolleanFillerTotal ? style.flexLeft : ''} `}>
                            {headCell.label}
                            <div className={`${style.wrappedFilter}`}>
                                {headCell.fillterHead ?
                                    headCell.id === 'status' ?
                                        <>
                                            <div className={bolleanFillerStatus ? style.open : style.close}>
                                                <IconButton aria-label="delete" onClick={fileredBooleanHandlerStatus}>
                                                    <FilterListIcon fontSize={'small'}/>
                                                </IconButton>

                                            </div>
                                            <SelectedHeader filtered={bolleanFillerStatus}
                                                            optionsArray={optionsArrayStatus}
                                                            optionsHeadStatus={optionsHeadStatus}
                                                            setOptionsHeadStatus={setOptionsHeadStatus}/>
                                        </>
                                        : <>
                                            <div className={bolleanFillerTotal ? style.open : style.close}>
                                                <IconButton aria-label="delete" onClick={fileredBooleanHandlerTotal}>
                                                    <FilterListIcon fontSize={'small'}/>
                                                </IconButton>

                                            </div>
                                            <SelectedHeader filtered={bolleanFillerTotal} optionsArray={optionsArrayTotal}
                                                            optionsHeadStatus={optionsHeadStatus}
                                                            setOptionsHeadStatus={setOptionsHeadStatus}/>
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