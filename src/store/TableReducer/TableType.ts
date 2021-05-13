
export type StatusType = 'подошел' | 'отказ' | 'думает';
export type TotalType = 'Выход на работу' | 'Стажировка'| 'Отказ' | 'Отк-Рук';
export type TypeSort = 'string' | 'number' | 'date' | 'boolean';
export type PositionType = 'Тракторист' | 'Каратист' | 'Президент' | 'Слесарь';
export type RequestStatusType = 'loading' | 'succeeded' | 'failed'
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

    position: PositionType,
    meeting: boolean,
}


export type Order = 'asc' | 'desc';

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

export enum PositionEnum {
    TRACTORIS = 'Тракторист',
    KARATIST = 'Каратист',
    PRESIDENT = 'Президент',
    SLESAR = 'Слесарь'
}