// components/AddToCart.tsx
'use client'
import React from 'react'
import { Product, Variant } from '@/app/utils/types'
import { useCartStore } from '@/app/libs/store'

interface AddToCartProps {
  product: Product
  variant?: Variant | null
  disabled?: boolean
}

export default function AddToCart({ product, variant, disabled = false }: AddToCartProps) {
  const addItem = useCartStore((state) => state.addItem)

  const usedVariant: Variant | null = variant || product.variants?.[0] || null

  const {
    trackQty = false,
    qty = 0,
    name: variantName = '',
  } = usedVariant || {}

  const isOutOfStock = trackQty && qty <= 0
  const shouldDisable = disabled || isOutOfStock
  const buttonText = isOutOfStock ? 'Out of stock' : 'Add to bag'

  const finalPrice = product.weekSale
    ? Math.max(0, product.price - (product.discount || 0))
    : product.price

  const handleClick = () => {
    if (shouldDisable || !usedVariant) return

    addItem({
      id: `${product.id}-${variantName}`,
      productId: product.id,
      product,
      variantName,
      quantity: 1,
      price: finalPrice,
    })
  }

  return (
    <button disabled={shouldDisable} onClick={handleClick}>
      {buttonText}
    </button>
  )
}

