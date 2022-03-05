import OperationTypeEnum from '@/enums/OperationTypeEnum'

export declare type OperationType = typeof OperationTypeEnum
export interface IPost {
  id: number
  title: string
  body?: string
  userId?: number
  type?: OperationType
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
