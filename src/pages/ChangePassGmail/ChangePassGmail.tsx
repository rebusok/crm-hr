import React, {FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {AppRootStateType} from "../../store/store";
import {validateInputNewPas} from "../../helper/validation";
import {CircularProgress} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {ChangePassword} from "../../store/NewPassReducer/NewPassReducer";
import {RoutingType} from "../../routes/Routes";

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

interface Props {

}

const ChangePassGmail: FC<Props> = () => {
    const classes = useStyles();
    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [errorMesPas, setErrorMesPas] = useState<string>('Password Required')
    const [errorMesConfirmPas, setErrorMesConfirmPas] = useState<string>('Confirm password Required\'')
    const [isValidPassword, setIsValidPassword] = useState<boolean>(true)
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState<boolean>(false)
    const errorMes = useSelector((state: AppRootStateType) => state.newPas.errorMes)
    const loading = useSelector((state: AppRootStateType) => state.newPas.loading)
    const isChange = useSelector((state: AppRootStateType) => state.newPas.changeMes)
    const dispatch = useDispatch()


    const history = useHistory()
    const regUrl = /(\/.+\/)/gm

    const token = history.location.pathname.replace(regUrl, "")

    const validPasswordValue = (value: string) => {
        validateInputNewPas(setPassword, value, setErrorMesPas, setIsValidPassword)
    }
    const validConfirmPasswordValue = (value: string) => {
        validateInputNewPas(setConfirmPassword, value, setErrorMesConfirmPas, setIsValidConfirmPassword)
        if (value !== password) {
            setIsValidConfirmPassword(true)
            setErrorMesConfirmPas('passwords must match')
        } else {
            setIsValidConfirmPassword(false)
        }
    }
    const changePasswordHandler = () => {
        if (password && confirmPassword) {
            dispatch(ChangePassword(password, token))
        }
        setPassword('')
    }
    if(isChange) {
        return <Redirect to={RoutingType.LOGIN}/>
    }
    console.log(isChange)
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Введите новый пароль
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SuperInputText
                                value={password}
                                label={"Пароль"}
                                name={'password'}
                                type={'password'}
                                onChangeText={validPasswordValue}
                                error={isValidPassword}
                                errorMes={errorMesPas}
                                setError={setIsValidPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SuperInputText
                                label={"Пароль еще раз"}
                                name={'confirmPassword'}
                                type={'password'}
                                value={confirmPassword}
                                onChangeText={validConfirmPasswordValue}
                                error={isValidConfirmPassword}
                                errorMes={errorMesConfirmPas}
                                setError={setIsValidConfirmPassword}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={changePasswordHandler}
                        disabled={loading || password !== confirmPassword}
                    >
                        Изменить пароль
                    </Button>

                </form>
            </div>
            {loading ? <CircularProgress /> : null}
            {!!errorMes ? <span>errorMes</span> : null}
        </Container>
    )
}


export default ChangePassGmail