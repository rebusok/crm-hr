import React, {FC} from 'react';
import {Route, Switch } from 'react-router-dom';
import MainPage from "../pages/Main/MainPage";
import EditPage from "../pages/EdditPage/EdditPage";



export enum RoutingType{
    MAIN='/',
    EDIT='/edit'
}



const Routes:FC = () => {
    return (
        <>
            <Switch>
                <Route exact path={RoutingType.MAIN} render={() => <MainPage/>}/>
                <Route exact path={`${RoutingType.EDIT}/:idRow`} render={() => <EditPage/>}/>
            </Switch>
        </>
    );
}

export default Routes;