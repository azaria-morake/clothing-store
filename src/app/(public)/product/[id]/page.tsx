'use client'
import React, { useState } from 'react'
import { Product, Variant } from '@/app/utils/types'
import db from '@/app/libs/db.json'
import AddToCart from '@/app/components/storefront/AddToCart'

interface PageProps {
  params: {
    id: string
  }
}

function ProductID({ params }: PageProps) {
  const { id } = params

  // Fetch product from db
  const { categories } = db
  const allItems = categories.map((cat) => cat.items).flat()
  const productInfo = allItems.find((item) => item.id == id) as Product | undefined

  // If not found, show fallback
  if (!productInfo) return <div>Product not found</div>

  // State to manage selected variant
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    productInfo.variants?.[0] || null
  )

  const { name, description, price, bestSeller, weekSale, image, variants } = productInfo

  return (
    <div>
      <h1>{name}</h1>
      <p>{image}</p>
      <p>{description}</p>
      <p>Price: {price}</p>
      <p>Best Seller: {bestSeller ? 'Yes' : 'No'}</p>
      <p>Weekly Sale: {weekSale ? 'Yes' : 'No'}</p>

      {/* Variant Selection Buttons */}
      {variants?.length > 1 &&
        variants.map((v) => {
          const isSelected = selectedVariant?.name === v.name
          return (
            <button
              key={v.name}
              onClick={() => setSelectedVariant(v)}
              disabled={v.trackQty && v.qty <= 0}
              style={{
                marginRight: '8px',
                padding: '6px 12px',
                backgroundColor: isSelected ? '#0070f3' : '#eaeaea',
                color: isSelected ? '#fff' : '#000',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {v.name} ({v.qty} in stock)
            </button>
          )
        })}

      <AddToCart
        product={productInfo}
        variant={selectedVariant}
        disabled={!selectedVariant || (selectedVariant.trackQty && selectedVariant.qty <= 0)}
      />
    </div>
  )
}

export default ProductID
