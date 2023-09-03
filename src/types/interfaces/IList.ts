export interface IList {
    id: string
    title: string
    date: string
    active: boolean
    total?: number
    user?: object
    items?: object[]
    createdAt?: string
    updatedAt?: string
}