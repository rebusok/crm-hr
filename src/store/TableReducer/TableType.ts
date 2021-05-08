
export type StatusType = 'подошел' | 'отказ' | 'думает';
export type TotalType = 'Выход на работу' | 'Стажировка'| 'Отказ' | 'Отк-Рук'
export type TableRowType = {
    [key: string]: any
    SS: string | null,
    created: string
    date: string,
    leaderInterview: boolean ,
    more_id: string
    name: string,
    path:string
    recommendation: string,
    status:StatusType,
    total: TotalType,
    type: string
    updated:string
    user_id:string
    user_name: string
    __v: number
    _id: string,

    position: string,
    meeting: boolean,
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
export enum StatusEnum {
    OK = 'подошел',
    NO = 'отказ',
    THINK = 'думает'
}
export type RequestStatusType = 'loading' | 'succeeded' | 'failed'
export enum TotalEnum{
    OFER= 'Выход на работу',
    CANSEL = 'Отказ',
    CANSEL_LID = 'Отк-Рук',
    TRANING = 'Стажировка'
}
export enum StatusFetchEnum {
    OK = 'succeeded',
    LOADING = 'loading',
    FAIL = 'failed'
}