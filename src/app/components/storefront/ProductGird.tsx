'use client'
import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/app/utils/types'
// Define the expected shape of each product item

interface ProductGridProps {
  data: Product[]
  tag?: string
}

function ProductGrid({ data, tag }: ProductGridProps) {
 
  return (
    <div>
      {tag&&<h2>{tag=='bestSeller'?'Best Sellers':'This Weeks Sales'}</h2>}
      {data.map((e, i) => (
        <div key={ i}>
          <ProductCard
          info={e}
          />
        </div>
      ))}
    </div>
  )
}

export default ProductGrid
