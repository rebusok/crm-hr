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

    return (
        <div>

        </div>
    );
};

export default RenderFormik;