import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useFormik} from 'formik';
import {ApiAuth} from "../../Api/Api";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export default function Auth() {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: 'yury.grush@gmail.com',
            password: '223044ss',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 6) {
                errors.password = 'Password has been 6 length'
            }
            return errors;
        },
        onSubmit: values => {
            const {email, password, rememberMe} = values
            ApiAuth.login(email, password, rememberMe).then(res => console.log(res))


            formik.resetForm()
        },
    })

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Email"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        {...formik.getFieldProps('email')}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched &&
                    formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    <TextField
                        variant="outlined"
                        autoComplete="current-password"
                        fullWidth
                        type="password"
                        label="Password"
                        margin="normal"
                        {...formik.getFieldProps('password')}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched &&
                    formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                    <FormControlLabel
                        label={'Remember me'}
                        color="primary"
                        control={<Checkbox/>}
                        {...formik.getFieldProps('rememberMe')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}