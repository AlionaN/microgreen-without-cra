export interface ICard {
  id: number,
  categoryId: number,
  title: string,
  description: string,
  amount?: number,
  size?:number,
  image: string,
  price: number
}
