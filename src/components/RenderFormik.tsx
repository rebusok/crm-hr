import React from 'react';
import {Button, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import style from "../pages/EdditPage/FormikEditOne.module.scss";
import MenuItem from "@material-ui/core/MenuItem";
import {
    PositionEnum,
    PositionType,
    StatusEnum,
    StatusType,
    TotalEnum,
    TotalType
} from "../store/TableReducer/TableType";
import {FormikProps} from "formik";


interface RenderFormikProps {
    title: string
}

interface FormValues {
    date: string
    time: string
    name: string
    meeting: boolean,
    position: PositionType
    status: StatusType
    recommendation: string
    leaderInterview: boolean
    total: TotalType
    SS: string
}

const RenderFormik = (props: RenderFormikProps & FormikProps<FormValues>) => {
    const optionsArrayStatus = [StatusEnum.OK, StatusEnum.NO, StatusEnum.THINK]
    const optionsArrayTotal = [TotalEnum.OFER, TotalEnum.CANSEL, TotalEnum.CANSEL_LID, TotalEnum.TRANING]
    const optionsArrayPosition= [PositionEnum.KARATIST, PositionEnum.SLESAR, PositionEnum.PRESIDENT, PositionEnum.TRACTORIS]
    return (
        <div>
            <form onSubmit={props.handleSubmit} className={style.container}>
                <div className={style.mainWrapper}>
                    <div>
                        <div className={style.itemWrapper}>
                            <TextField
                                id="date"
                                label="Дата"
                                type="date"

                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...props.getFieldProps('date')}
                            />
                        </div>
                        <div className={style.itemWrapper}>
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
                                {...props.getFieldProps('time')}
                            />
                        </div>
                        <div className={style.itemWrapper}>
                            <TextField
                                select
                                label="Должность"
                                variant="standard"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...props.getFieldProps('position')}
                            >
                                {optionsArrayPosition.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className={style.itemWrapper}>
                            <TextField required label="ФИО" {...props.getFieldProps('name')}/>
                        </div>
                        <div className={style.itemWrapper}>
                            <FormControlLabel
                                control={<Checkbox checked={props.values.meeting} {...props.getFieldProps('meeting')} />}
                                label="Встреча"
                            />
                        </div>
                    </div>
                    <div>
                        <div className={style.itemWrapper}>
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
                        </div>
                        <div className={style.itemWrapper}>
                            <TextField label='Рекомендации' {...props.getFieldProps('recommendation')}/>
                        </div>
                        <div className={style.itemWrapper}>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={props.values.leaderInterview} {...props.getFieldProps('leaderInterview')} />}
                                label="Интервью с руководителем"
                            />
                        </div>
                        <div className={style.itemWrapper}>
                            <TextField
                                select
                                label="Итог 2.0"
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
                        </div>
                        <div className={style.itemWrapper}>
                            <TextField
                                label="SS"
                                type="date"

                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...props.getFieldProps('SS')}
                            />
                        </div>
                    </div>

                </div>
                <div className={style.wrapperBtn}>
                    <Button type={'submit'}>{props.title}</Button>
                </div>
            </form>
        </div>
    );
};

export default RenderFormik;