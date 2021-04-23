import { v4 } from "uuid";
import {HeadCellsType, SortEnum, TableRowType} from "./store/TableReducer/TableType";

export const rows: Array<TableRowType> = [
    {id: v4(), date: '2021-04-22T14:28:50.295Z',total: 'Выход на работу',  position: 'Snow', name: 'Jon', meeting: false,   status:'подошел', recommendation: 'dsadasdasd', leaderInterview:false, SS:null, time:'2021-04-22T14:28:50.295Z'},
    {id: v4(),total: 'Выход на работу',  position: 'Lannister', name: 'Cersei', meeting: true, date: '2021-04-22T14:28:50.295Z',  status:'отказ', recommendation: 'dsadasdasd', leaderInterview:true, SS:'2021-04-22T14:28:50.295Z', time:'2021-04-22T14:28:50.295Z'},
    {id: v4(),total: 'Выход на работу',   position: 'Lannister', name: 'Jaime', meeting: false, date: '2001-04-22T14:28:50.295Z',  status:'думает', recommendation: 'dsadasdasd', leaderInterview:false, SS:null, time:'2021-04-22T14:28:50.295Z'},
    {id: v4(), total: 'Выход на работу',  position: 'Stark', name: 'Arya', meeting: true, date: '2011-04-22T14:28:50.295Z', status:'подошел', recommendation: 'dsadasdasd', leaderInterview:true, SS:null, time:'2021-04-22T14:28:50.295Z'},
    {id: v4(),total: 'Выход на работу',   position: 'Targaryen', name: 'Daenerys', meeting: false, date: '2001-04-22T14:28:50.295Z',  status:'подошел', recommendation: '', leaderInterview:false, SS:null, time:'2021-04-22T14:28:50.295Z'},
    {id: v4(), total: 'Выход на работу',  position: 'Melisandre', name: 'test', meeting: false, date: '2004-04-22T14:28:50.295Z',  status:'подошел', recommendation: '', leaderInterview:true, SS:null, time:'2021-04-22T14:28:50.295Z'},
    {id: v4(), total: 'Выход на работу',  position: 'Clifford', name: 'Ferrara', meeting: false, date: '2021-04-22T14:28:50.295Z',  status:'подошел', recommendation: '', leaderInterview:false, SS:null, time:'2021-04-22T14:28:50.295Z'},
    {id: v4(), total: 'Выход на работу',  position: 'Frances', name: 'Rossini', meeting: false, date: '2021-04-22T14:28:50.295Z',  status:'подошел', recommendation: '', leaderInterview:true, SS:null, time:'2021-04-22T14:28:50.295Z'},
    {id: v4(), total: 'Выход на работу',  position: 'Roxie', name: 'Harvey', meeting: false, date: '2021-04-22T14:28:50.295Z',  status:'подошел', recommendation: '', leaderInterview:false, SS:null, time:'2021-04-22T14:28:50.295Z'},
];
export const headCells: HeadCellsType[] = [
    {id: 'date', numeric: true, label: 'Дата', sorting: true, typeSorting: SortEnum.DATE},
    {id: 'time', numeric: true, label: 'Время', sorting: false, typeSorting: SortEnum.DATE},
    {id: 'position', numeric: false, label: 'Должность', sorting: true, typeSorting: SortEnum.STRING},
    {id: 'name', numeric: false, label: 'ФИО', sorting: false, typeSorting: SortEnum.STRING},
    {id: 'meeting', numeric: false, label: 'Встреча', sorting: false, typeSorting: SortEnum.BOOLEAN},
    {id: 'status', numeric: false, label: 'Итог', sorting: true, typeSorting: SortEnum.STRING},
    {id: 'recommendation', numeric: false, label: 'Рекомендации', sorting: false, typeSorting: SortEnum.STRING},
    {id: 'SS', numeric: false, label: 'Связь', sorting: true, typeSorting: SortEnum.DATE},

];