import React, {FC, useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {PositionType, StatusEnum, StatusType, TotalEnum, TotalType} from "../../store/TableReducer/TableType";
import MenuItem from "@material-ui/core/MenuItem";
import {createStyles, IconButton} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SaveIcon from '@material-ui/icons/Save';

interface PropsType {
    optionsArray: StatusEnum[] | TotalEnum[]
    id: string
    onChanges: (newValue: string, id: string) => void

    title: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }),
);

const EditableStatusTotal: FC<PropsType> = ({id, optionsArray, onChanges, title}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [openControl, setOpenControl] = useState<boolean>(false)
    const [value, setValue] = useState<string>('');
    const classes = useStyles();
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as StatusType | TotalType | '')
    }
    const saveChanges = () => {
        setOpenControl(false)
        onChanges(value, id)
    }
    return (
        <>
            {openControl
                ? <>
                    <FormControl>

                        <Select
                            labelId={optionsArray[0] + 'label'}
                            id={optionsArray[0]}
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            defaultValue={''}
                            value={value}
                            onChange={handleChange}
                        >
                            {
                                optionsArray && optionsArray.map((el: StatusType | TotalType | PositionType, index: number) => {
                                    return (
                                        <MenuItem key={el + index} value={el}>{el}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <IconButton  className={classes.margin} size="small" onClick={saveChanges} >
                        <SaveIcon fontSize="inherit"/>
                    </IconButton>
                </>
                : title
            }
            <IconButton aria-label="expand row" className={classes.margin} size="small" onClick={() => setOpenControl(!openControl)} >
                {openControl ? <ArrowUpwardIcon fontSize="inherit"/> : <ArrowDownwardIcon fontSize="inherit"/>}
            </IconButton>
        </>
    );
};

export default EditableStatusTotal;