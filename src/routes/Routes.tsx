import React, {FC} from 'react';
import {Route, Switch } from 'react-router-dom';
import EditPage from "../pages/EdditPage/EdditPage";
import TablePage from "../pages/Main/TablePage";



export enum RoutingType{
    MAIN='/',
    EDIT='/edit'
}



const Routes:FC = () => {
    return (
        <>
            <Switch>
                <Route exact path={RoutingType.MAIN} render={() => <TablePage/>}/>
                <Route exact path={`${RoutingType.EDIT}`} render={() => <EditPage/>}/>
            </Switch>
        </>
    );
}

export default Routes;