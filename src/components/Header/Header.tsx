import {AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar} from '@material-ui/core';
import React, {FC} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import cls from './Header.module.scss'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useDispatch, useSelector} from "react-redux";
import {isLoginSelect} from "../../utils/selectors";
import {setLogOut} from "../../store/AuthReducer/AuthReducer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);
type MenuToggleType = {
    onToggle: () => void
    isOpen: boolean
}
const Header: FC<MenuToggleType> = ({isOpen, onToggle}) => {
    const {isLogin} = useSelector(isLoginSelect)
    const dispatch = useDispatch()
    const classes = useStyles();


    const logOutHandler = () => {
        dispatch(setLogOut())
    }

    return (
        <>
            <AppBar>
                <Toolbar>
                    <div className={cls.wrapper}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                    onClick={onToggle}>
                            {!isOpen ? <MenuIcon/> : <CloseIcon/>}
                        </IconButton>
                        {isLogin
                            ? <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                          onClick={logOutHandler}>
                                <ExitToAppIcon/>
                            </IconButton>
                            : null
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;