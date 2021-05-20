import React, {FC, useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {PositionType, StatusEnum, StatusType, TotalEnum, TotalType} from "../../store/TableReducer/TableType";
import MenuItem from "@material-ui/core/MenuItem";
import {Button} from "@material-ui/core";
import {optionsArrayStatus} from "../../utils/ConstOptions";

interface PropsType {
    optionsArray: StatusEnum[] | TotalEnum[]
    id: string
    onChanges: (newValue:string, id:string) => void
    setClose: (value:boolean) => void
}

const EditableStatusTotal:FC<PropsType> = ({id,optionsArray,  onChanges, setClose}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as StatusType | TotalType|'')
    }
    const saveChanges = () => {
        setClose(false)
        onChanges(value, id)
    }
    return (
        <>
            <FormControl >

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
            <Button color="secondary" onClick={saveChanges}>Save</Button>
        </>
    );
};

export default EditableStatusTotal;