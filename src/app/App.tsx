import React from 'react';
import Header from "../components/Header";

import Routes from '../routes/Routes';
import Auth from "../pages/Auth/Auth";
import Registration from "../pages/Auth/Registration";
import TestTable from "../pages/Main/TestTable";


function App() {
    return (
        <>
            <Header/>
            <Routes/>
            {/*<Auth/>*/}
            <Registration/>
            {/*<TestTable/>*/}

        </>

    );
}

export default App;
