import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {getRowArray} from "../../utils/selectors";
import {Button, TextField} from "@material-ui/core";

const Statistic = () => {
    const rows = useSelector(getRowArray)
    const [start, setStart] = useState<string>('');
    const [finish, setFinish] = useState<string>('');
    const changeHandlerStart = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setStart(e.currentTarget.value)
    }
    const changeHandlerFinish= (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFinish(e.currentTarget.value)
    }
    const filterHandler = () => {
        const ffilter = rows.filter(el => el.date <= finish && el.date >= start)
        console.log(ffilter)
    }
    console.log(rows)
    return (
        <div>
            <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue={start}
                onChange={event => changeHandlerStart(event)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue={finish}
                onChange={event => changeHandlerFinish(event)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button onClick={filterHandler}>CLISJK</Button>
        </div>
    );
};

export default Statistic;