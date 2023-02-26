export interface User {
    username: string;
    work: Work[]
}
export interface Work {
    id?: string
    userId?: string
    startTime?: Date
    endTime?: Date
    diffTime?: string
    date?: string
}
export interface Login {
    token: string
}