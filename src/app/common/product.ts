import {Category} from './category';

export class Product {

  id: bigint;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  unitsInStock: number;
  category: Category;
}
