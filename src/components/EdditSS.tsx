import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React, {FC} from 'react';
import { TableRowType } from '../store/TableReducer/TableType';
import style from './EdditSs.module.scss'


const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

type PropsType = {
    row: TableRowType
}
const EdditSs:FC<PropsType> = (props) => {
    console.log(props)
    const classes = useStyles();
    return (
        <div >
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
        </div>
    );
};

export default EdditSs;