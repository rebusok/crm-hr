import {Button, makeStyles, Toolbar} from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import {RoutingType} from "../routes/Routes";
import { NavLink } from 'react-router-dom';
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
const Header = () => {

    const classes = useStyles();
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <NavLink to={RoutingType.MAIN}>Меню</NavLink>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <NavLink to={RoutingType.LOGIN}>Login</NavLink>
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;