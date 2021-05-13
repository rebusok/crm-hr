import React from 'react';
import {
    PositionEnum,
    PositionType,
    StatusEnum,
    StatusType,
    TotalEnum,
    TotalType
} from "../../store/TableReducer/TableType";
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
            position: PositionEnum.KARATIST as PositionType,
            status: StatusEnum.THINK as StatusType,
            recommendation: '',
            leaderInterview: false,
            total: TotalEnum.TRANING as TotalType,
            SS: '',

        },
        onSubmit: (values) => {
            console.log(values)
            const currentSS = setYear(values.SS)
            const newObject = {
                date: '',
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

    });
    return (
        <RenderFormik title={'Добавить'} {...formik} />
    );
};

export default AddNewPage;