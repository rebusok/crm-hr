import React from 'react';

const EdditPage = () => {
    return (
        <div>
            
        </div>
    );
};

export default EdditPage;



// import React from 'react';
// import {useParams} from 'react-router-dom';
//
// import {Button, Checkbox, createStyles, FormControlLabel, makeStyles, TextField, Theme} from "@material-ui/core";
// import {useFormik} from 'formik';
// import {useSelector} from "react-redux";
// import {AppRootStateType} from "../../store/store";
// import {currentDate, currentyTime} from "../Main/MainPage";
//
//
// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         container: {
//             display: 'flex',
//             flexWrap: 'wrap',
//             marginTop: 20
//         },
//         textField: {
//             marginLeft: theme.spacing(1),
//             marginRight: theme.spacing(1),
//             width: 200,
//         },
//     }),
// );
// const EditPage = () => {
//     const classes = useStyles();
//     const rows = useSelector((state: AppRootStateType) => state.tableRows)
//     const {idRow} = useParams<{ idRow: string }>();
//     const row = rows.find(el => el.id === +idRow);
//     const currencyMeeting = [
//         {
//             value: true,
//             label: 'Состоялась'
//         },
//         {
//             value: false,
//             label: 'Не состоялась'
//         }
//     ]
//
//
//
//     const setTime = (data:string, time: string, row: any) => {
//         const date = new Date(row.date)
//         const arrDate = data?.split('-').map(el => (+el))
//         const arrayTime = time?.split(':').map(el => +el)
//         date.setFullYear(arrDate[0], arrDate[1] - 1, arrDate[2])
//         date.setHours(arrayTime[0], arrayTime[1])
//         return date.toISOString()
//
//     }
//
//     const formik = useFormik({
//         initialValues: {
//             date: row ? currentDate.format(new Date(row.date)).split('.').reverse().join('-') : null,
//             time: row ? currentyTime.format(new Date(row.date)).substr(0, 5) : null,
//             name: row?.name,
//             meeting: true
//         },
//         onSubmit: (values) => {
//             const time = values.time
//             const date = values.date
//
//
//             if (time && date) {
//                 const currentTime = setTime(date,time, row)
//                 console.log({date: currentTime, name: values.name, id: row?.id, meeting:values.meeting})
//             }
//
//             formik.resetForm();
//         },
//         // validate: (values) => {
//         //     const errors: ErrorType = {};
//         //
//         //     if (!values.email) {
//         //         errors.email = 'Required';
//         //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         //         errors.email = 'Invalid email address';
//         //     }
//         //
//         //     return errors;
//         // }
//     });
//     return (
//         <div className={classes.container}>
//             <form onSubmit={formik.handleSubmit}>
//                 <TextField
//                     id="date"
//                     label="Дата"
//                     type="date"
//                     className={classes.textField}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     {...formik.getFieldProps('date')}
//                 />
//                 <TextField
//                     id="time"
//                     label="Время"
//                     type="time"
//                     className={classes.textField}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     inputProps={{
//                         step: 300, // 5 min
//                     }}
//                     {...formik.getFieldProps('time')}
//                 />
//                 <TextField required id="standard-required" label="Required" {...formik.getFieldProps('name')}/>
//                 <FormControlLabel
//                     control={<Checkbox  checked={formik.values.meeting} {...formik.getFieldProps('meeting')} /> }
//                     label="Secondary"
//                 />
//
//                 <Button type={'submit'}>Изменить</Button>
//             </form>
//         </div>
//     );
// };
//
// export default EditPage;