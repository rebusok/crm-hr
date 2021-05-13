import React, {FC} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import style from './SelectedHeader.module.scss'
import {PositionType, StatusEnum, StatusType, TotalEnum, TotalType} from "../../store/TableReducer/TableType";
import {useDispatch} from "react-redux";
import {addSearchPosition, addSearchStatus, addSearchTotal} from "../../store/TableReducer/TableReducer";
import {Button} from "@material-ui/core";

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
    optionsArray: StatusEnum[] | TotalEnum[] | PositionType[];
    id:string
    setCloseFilteredIcon: (el: boolean) => void
}

const  SelectedHeader:FC<SelectedHeaderProps> = ({filtered, optionsArray, id, setCloseFilteredIcon}) =>{
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<string >('');

    const dispath= useDispatch();
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {

        if(id === 'status') dispath(addSearchStatus(event.target.value as StatusType |  TotalType |PositionType))
        else if(id === 'total')dispath(addSearchTotal(event.target.value as StatusType |  TotalType |PositionType))
        else dispath(addSearchPosition(event.target.value as StatusType |  TotalType |PositionType))
        setValue(event.target.value as StatusType |  TotalType | PositionType | '')
        setCloseFilteredIcon(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const resetFilter =  () => {
        if(id === 'status') dispath(addSearchStatus(''))
        else if(id === 'total') dispath(addSearchTotal(''))
        else dispath(addSearchPosition(''))
        setCloseFilteredIcon(false);
        setValue('')
    }
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
                    value={value}
                    onChange={handleChange}
                >
                    {
                        optionsArray && optionsArray.map((el:StatusType |  TotalType | PositionType, index:number) => {
                            return (
                                <MenuItem key={el + index} value={el}>{el}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
            <Button color="secondary" onClick={resetFilter}>Reset</Button>
        </div>
    );
}

export default SelectedHeader
