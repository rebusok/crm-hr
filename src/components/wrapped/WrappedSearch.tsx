import React, {FC} from 'react';
import cls from './WrappedSearch.module.css'

interface PropsType {
    setPropsOpen?: (value:boolean)=> void
    closeProps?: boolean
}
const WrappedSearch:FC<PropsType> = ({closeProps,  children}) => {

    // const onToggleHandler = () => {
    //     if (setPropsOpen) setPropsOpen(!closeProps)
    // }
    return (
        <>
            <div className={closeProps ? cls.close : cls.open}>{children}</div>
        </>
    );
};

export default WrappedSearch;