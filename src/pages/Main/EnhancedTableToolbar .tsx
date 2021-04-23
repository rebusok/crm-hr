import {createStyles, IconButton, lighten, Theme, Tooltip} from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React, {FC} from 'react';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
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
const EnhancedTableToolbar:FC<EnhancedTableToolbarProps> = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const rows = useSelector((state: AppRootStateType) => state.tableRows)
    const editHandler = () => {
        console.log(rows.filter(a => props.selected.includes(a.id)))

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
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={editHandler}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        </>
    );
};

export default EnhancedTableToolbar;