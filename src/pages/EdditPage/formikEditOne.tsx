import React, {FC} from 'react';
import {useFormik} from "formik";
import {StatusFetchEnum, TableRowType} from "../../store/TableReducer/TableType";
import {currentDate, currentyTime, setTime, setYear} from "../../helper/helper";
import {useDispatch, useSelector} from "react-redux";
import {clearEditTable, updatePack} from "../../store/TableReducer/TableReducer";
import RenderFormik from "../../components/RenderFormik";
import {AppRootStateType} from "../../store/store";
import {CircularProgress} from "@material-ui/core";

interface FormikEditOnePropsType {
    row: TableRowType
}

const FormikEditOne: FC<FormikEditOnePropsType> = ({row}) => {

    const dispatch = useDispatch();
    const {status} = useSelector((state: AppRootStateType) => state.tableRows)
    const formik = useFormik({
        initialValues: {
            date: row ? currentDate.format(new Date(row.date)).split('.').reverse().join('-') : "",
            time: row ? currentyTime.format(new Date(row.date)).substr(0, 5) : "",
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
            if (time && date) {

                const currentTime = setTime(date, time, row)
                const currentSS = setYear(values.SS)
                const newObject = {
                    date: currentTime,
                    name: values.name,
                    _id: row?._id,
                    meeting: values.meeting,
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
    if(status === StatusFetchEnum.LOADING) return <CircularProgress />
    else return (
        <RenderFormik title={'Изменить'} {...formik}/>
    );
};

export default FormikEditOne;