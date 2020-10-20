import {Customer} from './customer';
import {Product} from './product';

export class Purchase {
  id: bigint;
  purchaseCode: string;
  status: number;
  date: Date;
  customer: Customer;
  products: Product[];
}
