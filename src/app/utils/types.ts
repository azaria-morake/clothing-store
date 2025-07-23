// types.ts
// types.ts

export interface VariantOption {
    name: string
    value: string
  }
  
  export interface Variant {
    name: string
    qty: number
    price: number
    trackQty: boolean
    options: Record<string, string>
  }
  
export interface Product {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  variants: Variant[];
  inStock: boolean;
  bestSeller: boolean;
  weekSale: boolean;
  discount: number;
  description: string;
}
  
  export interface CartItem {
    id: string
    productId: string | number
    product: Product
    variantName?: string
    quantity: number
    price: number
  }
  export interface CartState {
    items: CartItem[]
    total: number
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    incrementItem: (id: string) => void
    decrementItem: (id: string) => void
    clearCart: () => void
  }
  
  export interface Category {
    id: string | number
    name: string
    image: string
    description: string
  }
  