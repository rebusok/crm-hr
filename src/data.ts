import {HeadCellsType, SortEnum, TableRowType} from "./store/TableReducer/TableType";

export const rows: Array<TableRowType> = [];
export const headCells: HeadCellsType[] = [
    {id: 'date', numeric: true, label: 'Дата', sorting: true, typeSorting: SortEnum.DATE,},
    {id: 'time', numeric: true, label: 'Время', sorting: false, typeSorting: SortEnum.DATE,},
    {id: 'position', numeric: false, label: 'Должность', sorting: true, typeSorting: SortEnum.STRING,},
    {id: 'name', numeric: false, label: 'ФИО', sorting: false, typeSorting: SortEnum.STRING,},
    {id: 'meeting', numeric: false, label: 'Встреча', sorting: false, typeSorting: SortEnum.BOOLEAN,},
    {id: 'status', numeric: false, label: 'Итог', sorting: false, typeSorting: SortEnum.STRING,},
    {id: 'recommendation', numeric: false, label: 'Рекомендации', sorting: false, typeSorting: SortEnum.STRING,},
    {id: 'leaderInterview', numeric: false, label: 'Интервью с руководителем', sorting: true, typeSorting: SortEnum.BOOLEAN,},
    {id: 'total', numeric: false, label: 'Итог2.0', sorting: false, typeSorting: SortEnum.STRING,},
    {id: 'SS', numeric: false, label: 'Связь', sorting: true, typeSorting: SortEnum.DATE,},

];