import {useStyles} from "@material-ui/x-grid-data-generator/dist/cjs/_modules_/grid/components/containers/GridRootStyles";
import React from "react";
import {Order, OrderEnum, TypeSort} from "../../store/TableReducer/TableType";
import {TableHead} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {headCells} from "../../data";
import style from "../../pages/Main/TablePage.module.scss";

interface EnhancedTableProps {
    classes?: ReturnType<typeof useStyles>;
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
    onRequestSort: (typeSorting: string, sortByValue: Order, keyValue: string) => void;
}


function TableHeader(props: EnhancedTableProps) {
    const { onRequestSort} = props;

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
                        align={headCell.numeric ? 'left' : 'center'}

                    >
                        <div className={style.divHeader}>
                            {headCell.label}
                            {headCell.sorting
                                ? <div>
                                    <button
                                        onClick={() => handlerSorting(headCell.typeSorting, OrderEnum.ASC, headCell.id)}>up
                                    </button>
                                    <button
                                        onClick={() => handlerSorting(headCell.typeSorting, OrderEnum.DESK, headCell.id)}>down
                                    </button>
                                </div>
                                : null}
                        </div>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default TableHeader;