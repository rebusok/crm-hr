import React from 'react';
import {Button, Checkbox, createStyles, FormControlLabel, makeStyles, TextField, Theme} from "@material-ui/core";
import style from "../pages/EdditPage/FormikEditOne.module.scss";
import MenuItem from "@material-ui/core/MenuItem";
import {StatusEnum, StatusType, TotalEnum, TotalType} from "../store/TableReducer/TableType";
import {FormikProps} from "formik";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);
interface RenderFormik{
    title:string
}
interface FormValues {
    date: string
    time: string
    name: string
    meeting: boolean,
    position: string
    status: StatusType
    recommendation: string
    leaderInterview: boolean
    total: TotalType
    SS: string
}

const RenderFormik = (props: RenderFormik & FormikProps<FormValues>) => {
    const classes = useStyles();
    const optionsArrayStatus = [StatusEnum.OK, StatusEnum.NO, StatusEnum.THINK]
    const optionsArrayTotal = [TotalEnum.OFER, TotalEnum.CANSEL, TotalEnum.CANSEL_LID, TotalEnum.TRANING]
    return (
        <div >
            <form onSubmit={props.handleSubmit} className={style.container}>
                <TextField
                    id="date"
                    label="Дата"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...props.getFieldProps('date')}
                />
                <TextField
                    id="time"
                    label="Время"
                    type="time"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    {...props.getFieldProps('time')}
                />
                <TextField required id="standard-required" label="Должность" {...props.getFieldProps('position')}/>
                <TextField required id="standard-required" label="ФИО" {...props.getFieldProps('name')}/>
                <div>
                    <FormControlLabel
                        control={<Checkbox  checked={props.values.meeting} {...props.getFieldProps('meeting')} /> }
                        label="Встреча"
                    />
                </div>
                <TextField
                    select
                    label="Итог"
                    variant="standard"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...props.getFieldProps('status')}
                >
                    {optionsArrayStatus.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}

                </TextField>
                <TextField required id="standard-required" label='Рекомендации' {...props.getFieldProps('recommendation')}/>
                <div>
                    <FormControlLabel
                        control={<Checkbox  checked={props.values.leaderInterview} {...props.getFieldProps('leaderInterview')} /> }
                        label="Интервью с руководителем"
                    />
                </div>
                <TextField
                    select
                    label="Итог"
                    variant="standard"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...props.getFieldProps('total')}
                >
                    {optionsArrayTotal.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}

                </TextField>
                <TextField
                    id="date"
                    label="SS"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...props.getFieldProps('SS')}
                />
                <Button type={'submit'}>{props.title}</Button>
            </form>
        </div>
    );
};

export default RenderFormik;