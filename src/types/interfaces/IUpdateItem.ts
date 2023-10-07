export interface IUpdateItem {
  id: string
  name?: string
  collected?: boolean
  category?: {
    id?: string,
    name?: string
  }
}