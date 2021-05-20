import React from 'react';
import {PositionEnum, PositionType} from "../../store/TableReducer/TableType";
import {useFormik} from "formik";
import {addNewCandidate} from "../../store/TableReducer/TableReducer";
import {useDispatch} from "react-redux";
import {Button, FormControl, TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputMask from "react-input-mask";
import {FormGroup} from '@material-ui/core';
import cls from './AddNewPage.module.scss'


const AddNewPage = () => {
    const dispatch = useDispatch();
    type FormikErrorType = {
        name?: string
        surname?: string
        address?: string
        phone?: string
        other?: string
    }
    const optionsArrayPosition = [PositionEnum.KARATIST, PositionEnum.SLESAR, PositionEnum.PRESIDENT, PositionEnum.TRACTORIS]
    const formik = useFormik({
        initialValues: {
            date: '',
            time: '',
            name: '',
            position: PositionEnum.KARATIST as PositionType,
            phone: ''

        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (values.phone.replace(/_/gm, '').length <= 16) {
                errors.phone = 'Invalid phone'
            }
            return errors;
        },
        onSubmit: (values) => {
            console.log(values)

            const newObject = {
                date: values.date,
                name: values.name,
                time: values.time,
                position: values.position,
                phone: values.phone
            }

            dispatch(addNewCandidate(newObject))

            formik.resetForm();
        },

    });
    return (
        <div className={cls.container}>
            <form onSubmit={formik.handleSubmit}>
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
                        {formik.touched &&
                        formik.errors.phone ? <div style={{color: 'red'}}>{formik.errors.phone}</div> : null}
                    </FormGroup>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Добавить</Button>
                </FormControl>
            </form>
        </div>
    );
}

export default AddNewPage;