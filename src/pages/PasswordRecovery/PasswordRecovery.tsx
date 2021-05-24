import React from 'react';
import {Button, Container, FormControl, FormGroup, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import {setChekWithThunk} from "../../store/PassordRecoderyReducer/PassordRecoderyReducer";
import {useDispatch} from "react-redux";
import cls from './PasswordRecovery.module.css'
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";


type ErrorType = {
    email?: string
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const PasswordRecovery = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: (values) => {
            dispatch(setChekWithThunk(values.email))
            formik.resetForm();
        },
        validate: (values) => {
            const errors: ErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        }
    });
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Укажите почту для восстановления пароля
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <div>
                                <TextField required label="Email" {...formik.getFieldProps('email')}/>
                            </div>
                            {
                                formik.touched.email && formik.errors.email
                                    ? <div className={cls.error}>{formik.errors.email}</div> : null
                            }
                        </FormGroup>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Сбросить пароль</Button>
                    </FormControl>

                </form>
            </div>
        </Container>
    );
};

export default PasswordRecovery;