import React, {FC} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import style from './SelectedHeader.module.scss'
import {StatusType, TotalType} from "../../store/TableReducer/TableType";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

interface SelectedHeaderProps {
    filtered: boolean,
    optionsArray: string[]
    setOptionsHeadStatus: (optionsValue:StatusType | TotalType) => void
    optionsHeadStatus: StatusType | '' | TotalType
}

const  SelectedHeader:FC<SelectedHeaderProps> = ({filtered, optionsArray, setOptionsHeadStatus, optionsHeadStatus}) =>{
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setOptionsHeadStatus(event.target.value as StatusType |  TotalType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className={filtered ? style.open : style.close}>

            <FormControl className={classes.formControl}>
                <InputLabel id={optionsArray[0] + 'label'}>Фильтр</InputLabel>
                <Select
                    labelId={optionsArray[0] + 'label'}
                    id={optionsArray[0] }
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    defaultValue={''}
                    value={optionsHeadStatus}
                    onChange={handleChange}
                >
                    {
                        optionsArray && optionsArray.map((el, index) => {
                            return (
                                <MenuItem key={el + index} value={el}>{el}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectedHeader
