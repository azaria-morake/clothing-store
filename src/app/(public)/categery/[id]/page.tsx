import ProductGrid from '@/app/components/storefront/ProductGird'
import { getProductsByCategory } from '@/app/libs/dbCalls'
import React from 'react'
interface PageProps {
    params: {
      id: string
    }
  }
async function Category({ params }: PageProps) {
    const { id } = params
    const productList= await getProductsByCategory(id)
  return (
    <div>
        <ProductGrid
        data={productList as Product[]}
        />
    </div>
  )
}

export default Category