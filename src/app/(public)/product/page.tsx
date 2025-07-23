import React from 'react'
import ProductGrid from '@/app/components/storefront/ProductGird';
import { Product } from '@/app/utils/types';
import { getProducts } from '@/app/libs/dbCalls';
async function ProductPage() {
    
    let items =await getProducts()
   
  return (
    <div>
        <ProductGrid
        data={items as Product[]}
        />
    </div>
  )
}

export default ProductPage