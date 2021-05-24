import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import FormikEditOne from "./formikEditOne";
import {TableRowType} from "../../store/TableReducer/TableType";
import {Redirect} from "react-router-dom";
import {RoutingType} from "../../routes/Routes";
import {isLoginSelect} from "../../utils/selectors";


const EditPage = () => {
    const rows = useSelector((state: AppRootStateType) => state.tableRows.edditRows)
    const {isLogin}= useSelector(isLoginSelect)
    useEffect(() => {
        //fetchRows
    }, [rows])
    if (!isLogin) {
        return <Redirect to={RoutingType.LOGIN}/>
    }
    return (
        <div>
            {rows.length > 0? rows.map((row:TableRowType) => {
                return (
                    <FormikEditOne row={row} key={row._id}/>

                )
            }) :  <h1>EMPTY</h1>}
        </div>
    )




};

export default EditPage;