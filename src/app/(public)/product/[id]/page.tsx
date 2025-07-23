'use client'

import React, { useState, useEffect } from 'react'
import { Product, Variant } from '@/app/utils/types'
import AddToCart from '@/app/components/storefront/AddToCart'

interface PageProps {
  params: {
    id: string
  }
}

function ProductID({ params }: PageProps) {
  const { id } = params
  const [productInfo, setProductInfo] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/getSingleProduct?id=${id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        setProductInfo(data)
        setSelectedVariant(data.variants?.[0] || null)
      } catch (err) {
        console.error('Failed to load product', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!productInfo) return <div>Product not found</div>

  const { name, description, price, bestSeller, weekSale, image, variants } = productInfo

  return (
    <div>
      <h1>{name}</h1>
      <p>{image}</p>
      <p>{description}</p>
      <p>Price: {price}</p>
      <p>Best Seller: {bestSeller ? 'Yes' : 'No'}</p>
      <p>Weekly Sale: {weekSale ? 'Yes' : 'No'}</p>

      {variants?.length > 1 &&
        variants.map((v,i) => {
          const isSelected = selectedVariant?.name === v.name
          return (
            <button
              key={i}
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


