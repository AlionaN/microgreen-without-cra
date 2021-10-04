export interface IProductFromDB {
  _id: string,
  __v: number,
  categoryId: string,
  title: string,
  description: string,
  amount?: number,
  size?:number,
  image: string,
  price: number
}
