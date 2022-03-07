export interface IPost {
  id: number
  title: string
  body?: string
  userId?: number
  type?: string
  date?: string
}
export interface IIdx {
  idx: number
}
export interface IState {
  history: IPost[],
  desktop: IPost[],
  basket: IPost[],
  filterValue: string,
  errors: string[],
}
