import React, {ChangeEvent, FC, useState} from 'react';
import cls from './SearchForm.module.css'
import {IconButton, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

interface PropsType {
    disabledBtn:boolean
    setCurrentSearchName: (value:string) => void
    closeProps:boolean
}

const SearchForm: FC<PropsType> = ({disabledBtn, setCurrentSearchName, closeProps}) => {
    const [value, setValue] = useState<string>('');
    const [timerId, setTimerId] = useState<number>(0);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
        start()
    }
    const onClickHandler = () => {
        setCurrentSearchName(value)
    }
    const stop = () => {
        clearTimeout(timerId);
    }
    if (closeProps) {
        clearTimeout(timerId);
    }
    const start = () => {
        stop();
        const id: number = window.setTimeout(() => {
            setCurrentSearchName(value)
        }, 2000);
        setTimerId(id);
    }

    return (
        <div className={cls.mainWrap}>
            <TextField
                className={cls.textField}
                value={value}
                onChange={(e) => onChangeHandler(e)}
                label="Поиск по ФИО"
            />
            <span>
                <IconButton aria-label="filter list" disabled={disabledBtn} onClick={onClickHandler}>
                   <SearchIcon/>
                </IconButton>
            </span>
        </div>
    );
};

export default SearchForm;