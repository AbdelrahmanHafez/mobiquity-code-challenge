export interface IParsedPackageLine{
  maximumWeight: number,
  items: IItem[]
}

export interface IItem{
 index: number,
 cost: number,
 weight: number
}

export type ILineResult = string;
export type IRawLine = string;
export type IRawItem = string;