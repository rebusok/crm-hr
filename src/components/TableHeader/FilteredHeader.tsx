import React, {FC, useState} from 'react';
import style from "../../pages/Main/TablePage.module.scss";
import {IconButton} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import SelectedHeader from "../selected/SelectedHeader";
import {PositionType, StatusEnum, TotalEnum} from "../../store/TableReducer/TableType";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

type BropsType = {
   optionsArray: StatusEnum[] | TotalEnum[] | PositionType[];
   id: string
}


const FilteredHeader:FC<BropsType> = ({optionsArray, id}) => {
    const [open, setOpen] = useState<boolean>(false)
    const {searchTotal, searchStatus,searchPosition } = useSelector((state: AppRootStateType) => state.tableRows)
    const {disabledBtn} = useSelector((state: AppRootStateType) => state.app)

    return (
        <>
            <div className={style.close}>
                <IconButton disabled={disabledBtn} aria-label="delete" size="small" onClick={() => setOpen(!open)}>
                    <FilterListIcon fontSize={'small'}/>
                </IconButton>
                 <span className={`${style.fileredSpan} ${id === 'status' && searchStatus !== '' ? style.fileredSpanOpen : style.fileredSpanClose}` }>!</span>
                 <span className={`${style.fileredSpan} ${id === 'total' && searchTotal !== '' ? style.fileredSpanOpen : style.fileredSpanClose}` }>!</span>
                 <span className={`${style.fileredSpan} ${id === 'position' && searchPosition !== '' ? style.fileredSpanOpen : style.fileredSpanClose}` }>!</span>
            </div>
            <SelectedHeader filtered={open}
                            optionsArray={optionsArray}
                            id={id}
                            setCloseFilteredIcon={setOpen}
/>
        </>
    );
};

export default FilteredHeader;