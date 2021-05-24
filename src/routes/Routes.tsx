import React, {FC} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import EditPage from "../pages/EdditPage/EdditPage";
import TablePage from "../pages/Main/TablePage";
import AddNewPage from "../pages/AddNewPage/AddNewPage";
import Auth from "../pages/Auth/Auth";
import Statistic from "../pages/Statistic/Statistic";
import Registration from "../pages/Auth/Registration";
import Error404 from "../pages/ErrorPage/Error404";
import PasswordRecovery from "../pages/PasswordRecovery/PasswordRecovery";
import ChangePassGmail from "../pages/ChangePassGmail/ChangePassGmail";


export enum RoutingType {
    MAIN = '/',
    EDIT = '/edit',
    ADD = '/add',
    LOGIN = '/login',
    STATISTIC = '/statistic',
    REGISTRATION = '/registration',
    ERROR = '/error',
    newPass ="/set-new-password",
    RES_PASSWORD = '/resPass'
}


const Routes: FC = () => {
    return (
        <>
            <Switch>
                <Route exact path={RoutingType.MAIN} render={() => <TablePage/>}/>
                <Route exact path={RoutingType.EDIT} render={() => <EditPage/>}/>
                <Route exact path={RoutingType.ADD} render={() => <AddNewPage/>}/>
                <Route exact path={RoutingType.LOGIN} render={() => <Auth/>}/>
                <Route exact path={RoutingType.REGISTRATION} render={() => <Registration/>}/>
                <Route exact path={RoutingType.STATISTIC} render={() => <Statistic/>}/>
                <Route path = {RoutingType.newPass} render = {()=> <ChangePassGmail/>}/>
                <Route exact path = {RoutingType.RES_PASSWORD} render = {()=> <PasswordRecovery/>}/>
                <Route path={RoutingType.ERROR} render={() => <Error404/>}/>
                <Redirect from={'*'} to={RoutingType.ERROR}/>
            </Switch>
        </>
    );
}

export default Routes;