import React, {FC} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {makeStyles, Theme} from '@material-ui/core/styles';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme: Theme) => ({

    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

interface PropsType {
    open:boolean
    handleClose: (event?: React.SyntheticEvent, reason?: string) =>  void
}
const SnackbarRoot:FC<PropsType> = ({open, handleClose}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success">
                    Пользователь успешно добавлен!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SnackbarRoot;