import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setAuthMe} from "../store/AuthReducer/AuthReducer";
import {AppRootStateType} from "../store/store";
import {CircularProgress} from "@material-ui/core";
import Layout from "../components/wrapped/Layout/Layout";


function App() {

    const dispatch = useDispatch();
    const stableDispatch = useCallback(dispatch, [dispatch])
    const isInitial = useSelector((state: AppRootStateType) => state.app.isInitial)
    // selected
    useEffect(() => {
        stableDispatch(setAuthMe())
    }, [stableDispatch])

    if (!isInitial) {
        return <CircularProgress/>
    }
    return (
        <>
            <Layout/>
        </>

    );
}

export default App;
