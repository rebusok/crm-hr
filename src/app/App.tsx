import React, {useCallback, useEffect} from 'react';
import Header from "../components/Header";

import Routes from '../routes/Routes';
import {useDispatch, useSelector} from "react-redux";
import {setAuthMe} from "../store/AuthReducer/AuthReducer";
import {AppRootStateType} from "../store/store";
import {CircularProgress} from "@material-ui/core";


function App() {

    const dispatch = useDispatch();
    const stableDispatch = useCallback(dispatch, [dispatch])
    const isInitial = useSelector((state: AppRootStateType) => state.app.isInitial)
    // selected
    useEffect(() => {
        stableDispatch(setAuthMe())
    }, [stableDispatch])

    if(!isInitial) {
        return <CircularProgress />
    }
    return (
        <>
            <Header/>
            <Routes/>
            {/*<Auth/>*/}
            {/*<TestTable/>*/}
        </>

    );
}

export default App;
