import {AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar} from '@material-ui/core';
import React, {FC} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

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
const Header:FC<MenuToggleType> = ({isOpen, onToggle}) => {

    const classes = useStyles();
    return (
        <>
            <AppBar >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onToggle} >
                        {!isOpen ? <MenuIcon /> : <CloseIcon/>}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;