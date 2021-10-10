export interface IParsedPackageLine{
  maximumWeight: number,
  optionalItems: IOptionalItem[]
}

export interface IOptionalItem{
 index: number,
 cost: number,
 weight: number
}