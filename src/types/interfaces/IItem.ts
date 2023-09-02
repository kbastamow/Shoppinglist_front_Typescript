export interface IItem {
    msg: string,
    item: {
    id: string
    name: string
    collected?: boolean
    category?: string
    list?: string
    }
}