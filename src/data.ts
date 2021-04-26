import { v4 } from "uuid";
import {HeadCellsType, SortEnum, TableRowType} from "./store/TableReducer/TableType";

export const rows: Array<TableRowType> = [
    {id: v4(), date: '2021-04-22T14:28:50.295Z',total: 'Выход на работу',  position: 'Snow', name: 'Jon', meeting: false,   status:'подошел', recommendation: 'dsadasdasd', leaderInterview:false, SS:null,},
    {id: v4(),total: 'Стажировка',  position: 'Lannister', name: 'Cersei', meeting: true, date: '2021-04-22T14:28:50.295Z',  status:'отказ', recommendation: 'dsadasdasd', leaderInterview:true, SS:'2021-04-22T14:28:50.295Z',},
    {id: v4(),total: 'Отказ',   position: 'Lannister', name: 'Jaime', meeting: false, date: '2001-04-22T14:28:50.295Z',  status:'думает', recommendation: 'dsadasdasd', leaderInterview:false, SS:null,},
    {id: v4(), total: 'Отказ-руководителя',  position: 'Stark', name: 'Arya', meeting: true, date: '2011-04-22T14:28:50.295Z', status:'подошел', recommendation: 'dsadasdasd', leaderInterview:true, SS:null,},
    {id: v4(),total: 'Выход на работу',   position: 'Targaryen', name: 'Daenerys', meeting: false, date: '2001-04-22T14:28:50.295Z',  status:'подошел', recommendation: '', leaderInterview:false, SS:null,},
    {id: v4(), total: 'Выход на работу',  position: 'Melisandre', name: 'test', meeting: false, date: '2004-04-22T14:28:50.295Z',  status:'подошел', recommendation: '', leaderInterview:true, SS:null,},
    {id: v4(), total: 'Выход на работу',  position: 'Clifford', name: 'Ferrara', meeting: false, date: '2021-04-22T14:28:50.295Z',  status:'подошел', recommendation: '', leaderInterview:false, SS:null,},
    {id: v4(), total: 'Выход на работу',  position: 'Frances', name: 'Rossini', meeting: false, date: '2021-04-22T14:28:50.295Z',  status:'подошел', recommendation: '', leaderInterview:true, SS:null,},
    {id: v4(), total: 'Выход на работу',  position: 'Roxie', name: 'Harvey', meeting: false, date: '2021-04-22T14:28:50.295Z',  status:'подошел', recommendation: '', leaderInterview:false, SS:null,},
];
export const headCells: HeadCellsType[] = [
    {id: 'date', numeric: true, label: 'Дата', sorting: true, typeSorting: SortEnum.DATE, fillterHead:false},
    {id: 'time', numeric: true, label: 'Время', sorting: false, typeSorting: SortEnum.DATE, fillterHead:false},
    {id: 'position', numeric: false, label: 'Должность', sorting: true, typeSorting: SortEnum.STRING, fillterHead:false},
    {id: 'name', numeric: false, label: 'ФИО', sorting: false, typeSorting: SortEnum.STRING, fillterHead:false},
    {id: 'meeting', numeric: false, label: 'Встреча', sorting: false, typeSorting: SortEnum.BOOLEAN, fillterHead:false},
    {id: 'status', numeric: false, label: 'Итог', sorting: false, typeSorting: SortEnum.STRING, fillterHead:true},
    {id: 'recommendation', numeric: false, label: 'Рекомендации', sorting: false, typeSorting: SortEnum.STRING, fillterHead:false},
    {id: 'leaderInterview', numeric: false, label: 'Интервью с руководителем', sorting: true, typeSorting: SortEnum.BOOLEAN, fillterHead:false},
    {id: 'total', numeric: false, label: 'Итог', sorting: false, typeSorting: SortEnum.STRING, fillterHead:true},
    {id: 'SS', numeric: false, label: 'Связь', sorting: true, typeSorting: SortEnum.DATE, fillterHead:false},

];