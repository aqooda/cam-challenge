export interface Product {
  id: number;
  typeId: number;
  name: string;
}

export interface ProductType {
  id: number;
  name: string;
}

export interface Broker {
  id: number;
  name: string;
}

export interface TradeRecord {
  ref: string;
  productId: number;
  brokerId: number;
  date: string;
  qty: number;
  buySell: 'B' | 'S';
  price: number;
}
