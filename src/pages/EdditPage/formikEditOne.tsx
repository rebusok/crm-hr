import React, {FC} from 'react';
import {useFormik} from "formik";
import {Button, Checkbox, createStyles, FormControlLabel, makeStyles, TextField, Theme} from "@material-ui/core";
import {StatusEnum, TableRowType, TotalEnum} from "../../store/TableReducer/TableType";
import {currentDate, currentyTime, setTime, setYear} from "../../helper/helper";
import MenuItem from "@material-ui/core/MenuItem";
import style from './FormikEditOne.module.scss'
import {useDispatch} from "react-redux";
import {clearEdditTabler, editTableSucses} from "../../store/TableReducer/TableReducer";

interface FormikEditOnePropsType {
    row: TableRowType
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);
const FormikEditOne:FC<FormikEditOnePropsType> = ({row}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const optionsArrayStatus = [StatusEnum.OK, StatusEnum.NO, StatusEnum.THINK]
    const optionsArrayTotal = [TotalEnum.OFER, TotalEnum.CANSEL, TotalEnum.CANSEL_LID, TotalEnum.TRANING]
    const formik = useFormik({
        initialValues: {
            date: row ? currentDate.format(new Date(row.date)).split('.').reverse().join('-') : null,
            time: row ? currentyTime.format(new Date(row.date)).substr(0, 5) : null,
            name: row?.name,
            meeting: row.meeting,
            position: row.position,
            status: row.status,
            recommendation: row.recommendation,
            leaderInterview: row.leaderInterview,
            total: row.total,
            SS: row && row.SS ? currentDate.format(new Date(row.SS)).split('.').reverse().join('-') : '',
        },
        onSubmit: (values) => {
            const time = values.time
            const date = values.date
            console.log(values)
            if (time && date) {

                const currentTime = setTime(date,time, row)
                const currentSS = setYear(values.SS)
                const newObject = {row: {
                        date: currentTime, name: values.name, id: row?.id, meeting:values.meeting,total:values.total,
                        status: values.status, position: values.position, recommendation: values.recommendation, leaderInterview: values.leaderInterview, SS: currentSS === null ? null : currentSS
                    }}
                dispatch(editTableSucses(newObject.row))
                dispatch(clearEdditTabler(newObject.row.id))
                console.log(newObject)
            }

            formik.resetForm();
        },
        // validate: (values) => {
        //     const errors: ErrorType = {};
        //
        //     if (!values.email) {
        //         errors.email = 'Required';
        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //         errors.email = 'Invalid email address';
        //     }
        //
        //     return errors;
        // }
    });
    return (
        <div >
            <form onSubmit={formik.handleSubmit} className={style.container}>
                <TextField
                    id="date"
                    label="Дата"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...formik.getFieldProps('date')}
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
                    {...formik.getFieldProps('time')}
                />
                <TextField required id="standard-required" label="Должность" {...formik.getFieldProps('position')}/>
                <TextField required id="standard-required" label="ФИО" {...formik.getFieldProps('name')}/>
                <div>
                    <FormControlLabel
                        control={<Checkbox  checked={formik.values.meeting} {...formik.getFieldProps('meeting')} /> }
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
                    {...formik.getFieldProps('status')}
                >
                    {optionsArrayStatus.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}

                </TextField>
                <TextField required id="standard-required" label='Рекомендации' {...formik.getFieldProps('recommendation')}/>
                <div>
                    <FormControlLabel
                        control={<Checkbox  checked={formik.values.leaderInterview} {...formik.getFieldProps('leaderInterview')} /> }
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
                    {...formik.getFieldProps('total')}
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
                    {...formik.getFieldProps('SS')}
                />
                <Button type={'submit'}>Изменить</Button>
            </form>
        </div>
    );
};

export default FormikEditOne;