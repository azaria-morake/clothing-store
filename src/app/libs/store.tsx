// store/cartStore.ts
// store.ts
import { create } from 'zustand'
import { CartItem, CartState } from '../utils/types'

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,

  addItem: (item: CartItem) =>
    set((state) => {
      // Find existing item by productId and variantName (both must match)
      const existing = state.items.find(
        (i) => i.productId === item.productId && i.variantName === item.variantName
      )

      let updatedItems
      if (existing) {
        updatedItems = state.items.map((i) =>
          i.productId === item.productId && i.variantName === item.variantName
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      } else {
        updatedItems = [...state.items, item]
      }

      const newTotal = updatedItems.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      )

      return { items: updatedItems, total: newTotal }
    }),

  removeItem: (id: string) =>
    set((state) => {
      // Remove by CartItem id (string id, unique per cart entry)
      const updated = state.items.filter((item) => item.id !== id)
      const newTotal = updated.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      )
      return { items: updated, total: newTotal }
    }),

  incrementItem: (id: string) =>
    set((state) => {
      const updated = state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
      const newTotal = updated.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      )
      return { items: updated, total: newTotal }
    }),

  decrementItem: (id: string) =>
    set((state) => {
      const updated = state.items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
      const newTotal = updated.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      )
      return { items: updated, total: newTotal }
    }),

  clearCart: () => set({ items: [], total: 0 }),
}))
