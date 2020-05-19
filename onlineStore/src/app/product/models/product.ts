export interface IProduct{
  id: string,
  name: string,
  photos: any[],
  category: string,
  unit: string,
  price: number,
  reserved: number,
  available: number
}

export class Product implements IProduct {
  constructor(public id, public name, public photos, public category, public unit, public price, public reserved, public available){}
}
