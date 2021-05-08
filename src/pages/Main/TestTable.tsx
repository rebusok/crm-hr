import React, {useEffect} from 'react';
import MaterialTable from "material-table";
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {getPacksThunk} from "../../store/TableReducer/TableReducer";
import {user_id} from "./TablePage";
import {StatusEnum, TotalEnum, TotalType} from "../../store/TableReducer/TableType";
import {log} from "util";

const tableIcons = {
    Add: forwardRef<SVGSVGElement>((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef<SVGSVGElement>((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef<SVGSVGElement>((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef<SVGSVGElement>((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef<SVGSVGElement>((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef<SVGSVGElement>((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef<SVGSVGElement>((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef<SVGSVGElement>((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef<SVGSVGElement>((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef<SVGSVGElement>((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef<SVGSVGElement>((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef<SVGSVGElement>((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const TestTable = () => {

    // SS: null
    // created: "2021-05-08T00:38:06.364Z"
    // date: "2021-05-08T00:38:06.364Z"
    // leaderInterview: true
    // meeting: true
    // more_id: "60914ab8a9c7250c8cfbb0ae"
    // name: "ПИАНИСТ"
    // path: "/def"
    // position: "ПИАНИСТ"
    // recommendation: "some Test"
    // status: "подошел"
    // total: "Отказ"
    // type: "pack"
    // updated: "2021-05-08T00:38:06.364Z"
    // user_id: "60914ab8a9c7250c8cfbb0ae"
    // user_name: "yury.grush@gmail.com"
    const {status, searchTotal, searchStatus, rows} = useSelector((state: AppRootStateType) => state.tableRows)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPacksThunk(user_id))



    }, [user_id])

    return (
        <MaterialTable
            title="Basic Search Preview"
            icons={tableIcons}
            columns={[
                { title: 'ФИО', field: 'name' },
                { title: 'Дата', field: 'date' ,type: 'date', editable:'never',filtering: false },
                { title: 'Время', field: 'date', type: 'time',filtering: false },
                { title: 'Должность', field: 'position', },
                { title: 'Встреча', field: 'meeting',
                    lookup:{true: 'true', false:'false'}
                },
                {
                    title: 'Итог',
                    field: 'status',
                    lookup: { 'подошел': StatusEnum.OK, 'отказ': StatusEnum.NO, 'думает': StatusEnum.THINK }
                },
                { title: 'Рекомендации', field: 'recommendation', },
                { title: 'Интервью с руководителем', field: 'leaderInterview',
                    lookup:{true: 'true', false:'false'}
                },
                {
                    title: 'Итог2.0', field: 'total',
                    lookup: { 'Выход на работу': TotalEnum.OFER, 'Отказ': TotalEnum.CANSEL, 'Отк-Рук': TotalEnum.CANSEL_LID,  'Стажировка': TotalEnum.TRANING }
                },
                { title: 'Связь.0', field: 'SS', type: 'date' },

            ]}
            editable={{
                isEditable: rowData => {

                    return true
                }, // only name(a) rows would be editable
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {


                            resolve(1);
                        }, 100)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {

                            newData.date = new Date(newData.date).toISOString()



                            resolve(1);
                        }, 100)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {


                            resolve(1)
                        }, 1000)
                    }),
            }}
            options={{
                filtering: true
            }}
            data={rows}

        />
    )
};

export default TestTable;