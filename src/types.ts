export interface SushiItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'rolls' | 'nigiri' | 'sashimi' | 'special';
}

export interface CartItem extends SushiItem {
  quantity: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
}

export type View = 'sales' | 'products' | 'reports' | 'cash';