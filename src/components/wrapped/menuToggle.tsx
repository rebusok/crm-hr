import React from "react";
import s from './MenuToggle.module.scss';
import { NavLink } from "react-router-dom";
import {RoutingType} from "../../routes/Routes";
import BackDrop from "./BackDrop/BackDrop";
import {useSelector} from "react-redux";
import {isLoginSelect} from "../../utils/selectors";
type MenuToggleType = {
    onClose: () => void
    isOpen: boolean
}


const MenuToggle = (props:MenuToggleType) => {
    const cls = [
        s.Header
    ]
    const {isLogin}= useSelector(isLoginSelect)

    if (!props.isOpen){
        cls.push(s.close)
    }
    const clickHandler = () => {
        props.onClose()
    }
    return(
        <React.Fragment>
            <nav className={cls.join(' ')}>
                <div className={s.wrapper}>

                    {isLogin
                        ? <>
                            <NavLink
                                exact to={RoutingType.MAIN}
                                activeClassName={s.active}
                                onClick={clickHandler}>Главная</NavLink>

                            <NavLink
                                to={RoutingType.ADD}
                                activeClassName={s.active}
                                onClick={clickHandler}>Добавить кандидата</NavLink>
                            <NavLink
                                to={RoutingType.STATISTIC}
                                activeClassName={s.active}
                                onClick={clickHandler}>Статистика</NavLink>
                        </>
                        : <>
                            <NavLink
                                exact to={RoutingType.MAIN}
                                activeClassName={s.active}
                                onClick={clickHandler}>Главная</NavLink>
                            <NavLink
                                to={RoutingType.LOGIN}
                                activeClassName={s.active}
                                onClick={clickHandler}>Авторизация</NavLink>
                            <NavLink
                                to={RoutingType.REGISTRATION}
                                activeClassName={s.active}
                                onClick={clickHandler}>Регистрация</NavLink>
                        </>
                    }

                </div>
            </nav>
            {props.isOpen ? <BackDrop onClose={props.onClose}/> : null}
        </React.Fragment>
    )
}

export default MenuToggle