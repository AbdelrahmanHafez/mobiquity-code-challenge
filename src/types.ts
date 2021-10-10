export interface IParsedPackageLine{
  maximumWeight: number,
  items: IItem[]
}

export interface IItem{
 index: number,
 cost: number,
 weight: number
}