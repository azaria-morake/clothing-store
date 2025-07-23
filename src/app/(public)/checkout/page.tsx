'use client'

import React from 'react'
import { useCartStore } from '@/app/libs/store'

export default function Checkout() {
  const { items, total, incrementItem, decrementItem, removeItem, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div>
        <h2>Your cart is empty.</h2>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Checkout</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <li key={item.id + '-' + item.variantName} style={{ marginBottom: 20, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
            <h3>{item.product.name} {item.variantName && `- ${item.variantName}`}</h3>
            <p>Price: R {item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <div>
              <button onClick={() => decrementItem(item.id)} style={{ marginRight: 10 }}>-</button>
              <button onClick={() => incrementItem(item.id)} style={{ marginRight: 10 }}>+</button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>

      <h2>Total: R {total.toFixed(2)}</h2>

      <button onClick={clearCart} style={{ marginTop: 20, backgroundColor: 'red', color: 'white', padding: '10px 15px' }}>
        Clear Cart
      </button>
    </div>
  )
}
