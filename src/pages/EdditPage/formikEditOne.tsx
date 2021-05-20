import React, {FC} from 'react';
import {useFormik} from "formik";
import {PositionEnum, StatusEnum, StatusFetchEnum, TableRowType, TotalEnum} from "../../store/TableReducer/TableType";
import {currentDate, currentyTime, setTime, setYear} from "../../helper/helper";
import {useDispatch, useSelector} from "react-redux";
import {clearEditTable, updatePack} from "../../store/TableReducer/TableReducer";
import RenderFormik from "../../components/RenderFormik";
import {AppRootStateType} from "../../store/store";
import {Button, Checkbox, CircularProgress, FormControl, FormControlLabel, TextField} from "@material-ui/core";
import style from "./FormikEditOne.module.scss";
import MenuItem from "@material-ui/core/MenuItem";
import {FormGroup} from '@material-ui/core';
import InputMask from "react-input-mask";

interface FormikEditOnePropsType {
    row: TableRowType
}

const FormikEditOne: FC<FormikEditOnePropsType> = ({row}) => {

    const dispatch = useDispatch();
    const optionsArrayStatus = [StatusEnum.OK, StatusEnum.NO, StatusEnum.THINK]
    const optionsArrayTotal = [TotalEnum.OFER, TotalEnum.CANSEL, TotalEnum.CANSEL_LID, TotalEnum.TRANING]
    const optionsArrayPosition = [PositionEnum.KARATIST, PositionEnum.SLESAR, PositionEnum.PRESIDENT, PositionEnum.TRACTORIS]
    const {status} = useSelector((state: AppRootStateType) => state.tableRows)
    const formik = useFormik({
        initialValues: {
            date: row ? currentDate.format(new Date(row.date)).split('.').reverse().join('-') : "",
            time: row.time,
            name: row?.name,
            meeting: row.meeting ? row.meeting : false,
            position: row.position,
            status: row.status,
            recommendation: row.recommendation,
            leaderInterview: row.leaderInterview ? row.leaderInterview : false,
            phone: row.phone,
            total: row.total,
            SS: row && row.SS ? currentDate.format(new Date(row.SS)).split('.').reverse().join('-') : '',
        },
        onSubmit: (values) => {
            const time = values.time
            const date = values.date
            if (time && date) {


                const currentSS = setYear(values.SS)
                const newObject = {
                    date: new Date(Date.parse(date)).toISOString(),
                    time: time,
                    name: values.name,
                    _id: row?._id,
                    meeting: values.meeting,
                    phone: values.phone,
                    total: values.total,
                    status: values.status,
                    position: values.position,
                    recommendation: values.recommendation,
                    leaderInterview: values.leaderInterview,
                    SS: currentSS === null ? null : currentSS
                }
                dispatch(updatePack(newObject))
                dispatch(clearEditTable(newObject._id))

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
    if (status === StatusFetchEnum.LOADING) return <CircularProgress/>
    else return (
       <div className={style.container}>
           <form onSubmit={formik.handleSubmit} >
               <FormControl>
                   <FormGroup>

                       <TextField
                           id="date"
                           label="Дата"
                           type="date"

                           InputLabelProps={{
                               shrink: true,
                           }}
                           {...formik.getFieldProps('date')}
                       />

                       <TextField
                           id="time"
                           label="Время"
                           type="time"

                           InputLabelProps={{
                               shrink: true,
                           }}
                           inputProps={{
                               step: 300, // 5 min
                           }}
                           {...formik.getFieldProps('time')}
                       />

                       <TextField
                           select
                           label="Должность"
                           variant="standard"
                           margin="normal"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           {...formik.getFieldProps('position')}
                       >
                           {optionsArrayPosition.map((option) => (
                               <MenuItem key={option} value={option}>
                                   {option}
                               </MenuItem>
                           ))}
                       </TextField>

                       <TextField required label="ФИО" {...formik.getFieldProps('name')}/>
                       <InputMask
                           mask="+7(999) 999-99-99"
                           disabled={false}
                           {...formik.getFieldProps('phone')}
                       >
                           {(a: any) => {
                               return <TextField label="Phone" {...a} />
                           }}
                       </InputMask>
                       <FormControlLabel
                           control={<Checkbox
                               checked={formik.values.meeting} {...formik.getFieldProps('meeting')} />}
                           label="Встреча"
                       />


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

                       <TextField label='Рекомендации' {...formik.getFieldProps('recommendation')}/>

                       <FormControlLabel
                           control={<Checkbox
                               checked={formik.values.leaderInterview} {...formik.getFieldProps('leaderInterview')} />}
                           label="Интервью с руководителем"
                       />


                       <TextField
                           select
                           label="Итог 2.0"
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
                           label="SS"
                           type="date"

                           InputLabelProps={{
                               shrink: true,
                           }}
                           {...formik.getFieldProps('SS')}
                       />

                   </FormGroup>

                   <Button type={'submit'} variant={'contained'} color={'primary'}>Изменить</Button>

               </FormControl>
           </form>
       </div>
    );
};

export default FormikEditOne;