
import React, {FC} from 'react';
import s from './BackDrop.module.scss';

interface PropsType {
    onClose: () => void
}

const BackDrop:FC<PropsType> = (props) => {
    return (
        <div className={s.BackDrop} onClick={props.onClose}/>
    )
}


export default BackDrop;