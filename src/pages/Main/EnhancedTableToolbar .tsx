import {createStyles, IconButton, lighten, makeStyles, Theme, Toolbar, Tooltip, Typography} from '@material-ui/core';
import React, {FC} from 'react';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import {useDispatch} from "react-redux";
import {NavLink} from 'react-router-dom';
import {RoutingType} from "../../routes/Routes";
import {editTable} from "../../store/TableReducer/TableReducer";
import AddIcon from '@material-ui/icons/Add';
import style from './EnhancedTableToolbar.module.css'


export const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: '1 1 100%',
        },
    }),
);

interface EnhancedTableToolbarProps {
    numSelected: number;
    setSelected: Function
    selected: string[]
}

const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = (props) => {
    const classes = useToolbarStyles();
    const {numSelected} = props;

    const dispatch = useDispatch()
    const editHandler = () => {
        dispatch(editTable(props.selected))
    }
    return (
        <>
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                {numSelected > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        Таблица Машки
                    </Typography>
                )}
                <Tooltip title="add">
                    <IconButton aria-label="filter list">
                        <NavLink to={RoutingType.ADD} className={style.linkAdd}>
                            <AddIcon/>
                        </NavLink>
                    </IconButton>
                </Tooltip>
                {numSelected > 0 ? (
                    <Tooltip title="edit">
                        <NavLink to={RoutingType.EDIT} onClick={editHandler}>
                            <EditIcon/>
                        </NavLink>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        </>
    );
};

export default EnhancedTableToolbar;