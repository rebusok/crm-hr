import React, {FC} from 'react';
import {Route, Switch } from 'react-router-dom';
import EditPage from "../pages/EdditPage/EdditPage";
import TablePage from "../pages/Main/TablePage";
import AddNewPage from "../pages/AddNewPage/AddNewPage";



export enum RoutingType{
    MAIN='/',
    EDIT='/edit',
    ADD='/add'
}



const Routes:FC = () => {
    return (
        <>
            <Switch>
                <Route exact path={RoutingType.MAIN} render={() => <TablePage/>}/>
                <Route exact path={`${RoutingType.EDIT}`} render={() => <EditPage/>}/>
                <Route exact path={`${RoutingType.ADD}`} render={() => <AddNewPage/>}/>
            </Switch>
        </>
    );
}

export default Routes;