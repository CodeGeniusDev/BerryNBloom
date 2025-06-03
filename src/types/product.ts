export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  category: 'jam' | 'honey';
  featured?: boolean;
  new?: boolean;
  bestSeller?: boolean;
}