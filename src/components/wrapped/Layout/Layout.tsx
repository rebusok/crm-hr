import React, {useState} from "react";
import s from './Layout.module.scss';
import MenuToggle from "../menuToggle";
import Header from "../../Header/Header";
import Routes from "../../../routes/Routes";


const Layout = () => {
    const [menu, setMenu] = useState(false)
    const toggleMenuHandler = () => {
        setMenu(!menu)
    }
    const menuCloseHandler = () => {
        setMenu(false)
    }


    return (
        <div className={s.Layout}>
            <Header onToggle={toggleMenuHandler}
                    isOpen={menu}/>
            <div className={s.content}>
                <Routes/>
            </div>
            <MenuToggle
                onClose={menuCloseHandler}
                isOpen={menu}
            />
        </div>
    )
}

export default Layout;