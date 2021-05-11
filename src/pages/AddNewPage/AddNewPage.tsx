import React from 'react';
import {StatusEnum, StatusType, TotalEnum, TotalType} from "../../store/TableReducer/TableType";
import {useFormik} from "formik";
import RenderFormik from "../../components/RenderFormik";
import {setTime, setYear} from "../../helper/helper";
import {addNewCandidate} from "../../store/TableReducer/TableReducer";
import {useDispatch} from "react-redux";

const AddNewPage = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            date: '',
            time: '',
            name: '',
            meeting: false,
            position: '',
            status: StatusEnum.THINK as StatusType,
            recommendation: '',
            leaderInterview: false,
            total: TotalEnum.TRANING as TotalType,
            SS: '',

        },
        onSubmit: (values) => {
            console.log(values)
            const currentTime = values.date === '' ? '' : setTime(values.date, values.time)
            const currentSS = setYear(values.SS)
            const newObject = {
                date: currentTime,
                name: values.name,
                meeting: values.meeting,
                total: values.total,
                status: values.status,
                position: values.position,
                recommendation: values.recommendation,
                leaderInterview: values.leaderInterview,

                SS: currentSS === null ? null : currentSS
            }

            dispatch(addNewCandidate(newObject))

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
        <RenderFormik title={'Добавить'} {...formik} />
    );
};

export default AddNewPage;