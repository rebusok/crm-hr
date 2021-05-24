import {
    Order,
    SortEnum,
    StatusFetchEnum,
    StatusType,
    TableRowType,
    TotalType
} from "../../../store/TableReducer/TableType";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import style from "../TablePage.module.scss";
import {Checkbox, CircularProgress} from "@material-ui/core";
import {currentDate, setYear, smartSorting} from "../../../helper/helper";
import EditableMitingLeader from "../../../components/EditableSpanText/EditableMitingLeader";
import EditableStatusTotal from "../../../components/EditableSpanText/EditableStatusTotal";
import {optionsArrayStatus, optionsArrayTotal} from "../../../utils/ConstOptions";
import EditableSpanText from "../../../components/EditableSpanText/EditableSpanText";
import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {disableBtn} from "../../../utils/selectors";
import {editRecommendationValue, updatePack} from "../../../store/TableReducer/TableReducer";
import {AppRootStateType} from "../../../store/store";


interface PropsType {
    rowsPerPage: number
    rows: TableRowType[] | []
    currentSearchName: string
    typeSort: string
    order: Order
    orderBy: string
    page: number
    handleClickSelect: (event: React.MouseEvent<unknown>, name: string) => void
    isSelected:(name:string) => boolean
}

const RowMap: FC<PropsType> = (
    {
        rowsPerPage,
        rows,
        currentSearchName,
        typeSort,
        order,
        orderBy,
        page,
        handleClickSelect,
        isSelected,
    }
) => {
    const disabledBtn = useSelector(disableBtn)
    const dispatch = useDispatch();
    const {
        status
    } = useSelector((state: AppRootStateType) => state.tableRows)
    const filteredByName = rows.filter(el => {
        return el.name.toLowerCase().includes(currentSearchName.toLowerCase())
    })

    const changeInputStatus = (value:string, _id:string) => {
        const status = value as StatusType
        dispatch(updatePack({status, _id}))
    }
    const changeInputTotal = (value:string, _id:string) => {
        const total = value as TotalType
        dispatch(updatePack({total, _id}))
    }
    const changeMeetingCheck = (value: boolean, _id:string) => {
        console.log(value)
        dispatch(updatePack({meeting:value, _id}))
    }
    const changeLeaderCheck = (value: boolean, _id:string) => {
        dispatch(updatePack({leaderInterview:value, _id}))
    }
    const changeInputRecHandler = (recommendation: string, id: string) => {
        if(recommendation.trim() !== '') {
            dispatch(updatePack({recommendation, _id: id}))

            dispatch(editRecommendationValue(recommendation, id))
        } else {
            return
        }

    }
    const changeInputSsHandler = (ssValue: string, id: string) => {
        console.log(ssValue)
        const currentSs = setYear(ssValue.split('.').join('-'))
        console.log(currentSs)
        if (currentSs !== null) {
            dispatch(updatePack({SS: currentSs, _id: id}))
        }
    }
    return (
        <>
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
                                            onClick={(event) => handleClickSelect(event, row._id)}
                                        />
                                    </TableCell>
                                    <TableCell style={{width: 100}} component="th" scope="row" id={labelId}
                                               align="center">
                                        {currentDate.format(new Date(row.date))}
                                    </TableCell>
                                    <TableCell style={{width: 60}} align="center">
                                        {row.time}
                                    </TableCell>
                                    <TableCell style={{width: 80}} align="center">
                                        {row.position}
                                    </TableCell>
                                    <TableCell style={{width: 160}} align="center">
                                        {row.name}
                                    </TableCell>
                                    <TableCell style={{width: 160}} align="center">
                                        {row.phone}
                                    </TableCell>
                                    <TableCell style={{width: 100}} align="center">
                                        <EditableMitingLeader cheched={row.meeting} onChangeBoolean={changeMeetingCheck}
                                                              id={row._id}/>
                                    </TableCell>
                                    <TableCell style={{width: 120}} align="center">
                                        <EditableStatusTotal id={row._id} title={row.status}
                                                             optionsArray={optionsArrayStatus}
                                                             onChanges={changeInputStatus}/>
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
                                        <EditableMitingLeader cheched={row.leaderInterview}
                                                              onChangeBoolean={changeLeaderCheck} id={row._id}/>
                                    </TableCell>
                                    <TableCell style={{width: 100}} align="center">
                                        <EditableStatusTotal id={row._id} title={row.total} optionsArray={optionsArrayTotal}
                                                             onChanges={changeInputTotal}/>
                                    </TableCell>
                                    <TableCell style={{width: 100}} align="center">
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
        </>
    );
};


export default RowMap;