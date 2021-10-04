export interface IProductFromDB {
  _id: string,
  __v: number,
  categoryId: string,
  title: string,
  description: string,
  amount?: number,
  size?: string,
  image: string,
  price: number
}
