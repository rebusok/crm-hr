import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import {setRegistration} from "../../store/AuthReducer/AuthReducer";
import {isLoginSelect} from "../../utils/selectors";
import {AppRootStateType} from "../../store/store";
import {NavLink, Redirect} from "react-router-dom";
import {RoutingType} from "../../routes/Routes";
import {StatusFetchEnum} from "../../store/TableReducer/TableType";
import {LinearProgress} from "@material-ui/core";


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

export default function Registration() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {isLogin} = useSelector(isLoginSelect)

    const {profile} = useSelector((state: AppRootStateType) => state.profile)
    const {
        status
    } = useSelector((state: AppRootStateType) => state.tableRows)
    //validate Email with Password
    const reEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const rePassword = /(?=.*\d)(?=.*[a-zA-Z]).{6,}/;

    //isValid of Email, Password, Confirm Password
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false)
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState<boolean>(false)

    //values of Email, Password, Confirm Password
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    //Error
    const [errorEmail, setErrorEmail] = useState<string>('Login Required')
    const [errorPassword, setErrorPassword] = useState<string>('Password must be with number and A-Z, a-z letters, length must be 6 and more')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('passwords must match')


    const isValidateEmailReg = (value: string) => {
        setEmail(value)
        if (value.trim() === '') {
            setErrorEmail('Email is Required')
            setIsValidEmail(true)

        } else
            // if value inValid of reEmail
        if (!reEmail.test(value)) {
            setErrorEmail('Invalid Email')
            setIsValidEmail(true)

        } else {
            // else value email valid of reEmail
            setErrorEmail('')
            setIsValidEmail(false)

        }
    }
    //validate for Password
    const validatePassword = (value: string) => {
        setPassword(value)
        if (value.trim() === '' && value.length > 8) {

            setIsValidPassword(true)
            setErrorPassword('Password area is Required')

        } else if (!rePassword.test(value)) {
            setIsValidPassword(true)
            setErrorPassword('the password must contain one digit, and length must be 8 and more')
        } else {
            setIsValidPassword(false)
            setErrorPassword('')
        }
    }
    //validate for ConfirmPassword
    // confirmValue === passwordValue => true , else error
    const validateConfirmPassword = (value: string) => {
        setConfirmPassword(value)
        if (value !== password) {
            setIsValidConfirmPassword(true)
            setErrorConfirmPassword('Passwords must be the sames!')

        } else {
            setIsValidConfirmPassword(false)
            setErrorConfirmPassword('')
        }
    }

    const onRegistrationHandler = () => {
        if (email && password && confirmPassword) {
            dispatch(setRegistration(email, password))
        }
        console.log(email, password)
    }
    if (profile) {
        return <Redirect to={RoutingType.LOGIN}/>
    }
    if (isLogin) {
        return <Redirect to={RoutingType.MAIN}/>
    }

    return (
        <Container component="main" maxWidth="xs">
            {status === StatusFetchEnum.LOADING
                ? <LinearProgress/>
                : null
            }
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SuperInputText
                                label={"Email"}
                                name={'email'}
                                onChangeText={isValidateEmailReg}
                                error={isValidEmail}
                                errorMes={errorEmail}
                                setError={setIsValidEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SuperInputText
                                label={"Пароль"}
                                name={'password'}
                                type={'password'}
                                onChangeText={validatePassword}
                                error={isValidPassword}
                                errorMes={errorPassword}
                                setError={setIsValidPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SuperInputText
                                label={"Пароль еще раз"}
                                name={'confirmPassword'}
                                type={'password'}
                                onChangeText={validateConfirmPassword}
                                error={isValidConfirmPassword}
                                errorMes={errorConfirmPassword}
                                setError={setIsValidPassword}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onRegistrationHandler}
                    >
                        Зарегистрироваться
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <NavLink to={RoutingType.LOGIN}>
                                Уже зарегистрированы?
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}