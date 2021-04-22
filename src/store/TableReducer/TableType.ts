
type StatusType = 'подошел' | 'отказ' | 'думает';
type TotalType = 'Выход на работу' | 'Стажировка'| 'Отказ' | 'Отказ-руководителя'
export type TableRowType = {
    id: number,
    position: string,
    name: string,
    meeting: boolean,
    date: string,
    status:StatusType,
    recommendation: string,
    leaderInterview: boolean,
    SS: string | null,
    total: TotalType
}