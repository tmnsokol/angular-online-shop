export interface IProduct{
  id: number,
  title: string,
  year: number,
  price: number,
  image?: string,
  configure: IProductConfig,

  quanity: number
}


export interface IProductConfig{
  chip: string,
  ssd: string,
  memory: string,
  display: string
}
