import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import FormikEditOne from "./formikEditOne";
import {TableRowType} from "../../store/TableReducer/TableType";


const EditPage = () => {
    const rows = useSelector((state: AppRootStateType) => state.tableRows.edditRows)
    console.log(rows)
    useEffect(() => {
        //fetchRows
    }, [rows])
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