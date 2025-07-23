// components/ProductCard.tsx
'use client'
import React, { useState } from 'react'
import { Product, Variant } from '@/app/utils/types'
import AddToCart from './AddToCart'
import Link from 'next/link'

interface Props {
  info: Product
}

export default function ProductCard({ info }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    info.variants?.[0] || null
  )

  return (
    <div>
      <Link href={`/product/${info.id}`}>
        <h2>{info.name}</h2>
        <img src={info.image} alt={info.name} width={200} />
        <p>{info.description}</p>
        <p>Price: {info.price}</p>
        <p>Best Seller: {info.bestSeller ? 'Yes' : 'No'}</p>
        <p>Week Sale: {info.weekSale ? 'Yes' : 'No'}</p>
      </Link>

      {/* Variant buttons */}
      {info.variants.map((v) => {
        const isSelected = selectedVariant?.name === v.name
        return (
          <button
            key={v.name}
            onClick={() => setSelectedVariant(v)}
            disabled={v.trackQty && v.qty <= 0}
            style={{
              marginRight: '8px',
              padding: '6px 12px',
              backgroundColor: isSelected ? '#333' : '#eee',
              color: isSelected ? '#fff' : '#000',
              cursor: v.trackQty && v.qty <= 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {v.name} ({v.qty} in stock)
          </button>
        )
      })}

      {/* AddToCart component */}
      <AddToCart
        product={info}
        variant={selectedVariant}
        disabled={!selectedVariant || (selectedVariant.trackQty && selectedVariant.qty <= 0)}
      />
    </div>
  )
}

