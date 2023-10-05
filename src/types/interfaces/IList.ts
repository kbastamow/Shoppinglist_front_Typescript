import { IListItem } from "./IListItem"


export interface IList {
    id: string
    title: string
    date: string
    active: boolean
    total?: number
    user?: object
    items: IListItem[] | []
    createdAt?: string
    updatedAt?: string
}