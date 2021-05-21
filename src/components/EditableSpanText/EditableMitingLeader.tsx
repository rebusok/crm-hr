import React, {ChangeEvent, FC, useState} from 'react';
import {Checkbox, FormControlLabel, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import cls from './EditableMitingLeader.module.scss'
import SaveIcon from "@material-ui/icons/Save";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {StatusFetchEnum} from "../../store/TableReducer/TableType";


interface PropsType {
    cheched: boolean |null
    onChangeBoolean: (value:boolean, id:string) => void
    id: string
}
const EditableMitingLeader:FC<PropsType> = ({cheched, onChangeBoolean, id}) => {
    const [check, setCheck] = useState<boolean>(cheched  !== null ? cheched : false)
    const [openControl, setOpenControl] = useState<boolean>(false)
    const {status}  = useSelector((state: AppRootStateType) => state.auth)
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setCheck(e.currentTarget.checked)
    }
    const saveChanges = () => {
        setOpenControl(false)
        onChangeBoolean(check, id)
    }
    if(status === StatusFetchEnum.LOADING) return <div/>
    return (
        <div className={cls.wrapper}>
            {openControl ?
                <>
                    <FormControlLabel
                        control={<Checkbox
                            checked={check}
                            onChange={onChangeHandler}
                        />}
                        label="Встреча"
                    />
                    <IconButton   size="small" onClick={saveChanges} >
                        <SaveIcon fontSize="inherit"/>
                    </IconButton>
                </>
                : cheched === null ? null : cheched ? <CheckIcon/> : <CloseIcon/>
            }
            <IconButton aria-label="expand row"  size="small" onClick={() => setOpenControl(!openControl)} >
                {openControl ? <ArrowUpwardIcon fontSize="inherit"/> : <ArrowDownwardIcon fontSize="inherit"/>}
            </IconButton>

        </div>
    );
};

export default EditableMitingLeader;