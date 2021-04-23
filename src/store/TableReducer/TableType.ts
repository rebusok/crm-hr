
type StatusType = 'подошел' | 'отказ' | 'думает';
type TotalType = 'Выход на работу' | 'Стажировка'| 'Отказ' | 'Отказ-руководителя'
export type TableRowType = {
    [key: string]: any
    id: string,
    position: string,
    name: string,
    meeting: boolean,
    date: string,
    status:StatusType,
    recommendation: string,
    leaderInterview: boolean ,
    SS: string | null,
    total: TotalType,
    time:string
}
export type Order = 'asc' | 'desc';
export type TypeSort = 'string' | 'number' | 'date' | 'boolean'
export enum OrderEnum {
    ASC= 'asc',
    DESK = 'desc'
}
export type HeadCellsType = {
    id: string,
    numeric: boolean,
    label: string,
    sorting: boolean,
    typeSorting: TypeSort | null,

}
export enum SortEnum {
    STRING = 'string',
    NUMBER = 'number',
    DATE = 'date',
    BOOLEAN = 'boolean'
}