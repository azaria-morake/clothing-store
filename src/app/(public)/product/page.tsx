import React from 'react'
import db from '@/app/libs/db.json'
import ProductGrid from '@/app/components/storefront/ProductGird';
import { Product } from '@/app/utils/types';
function Product() {
    // replace with db call
    const {categories,storeName}=db;
    let items =categories.map((e)=>{return e.items});
    let fulllist=items.flat();
    
  return (
    <div>
        <ProductGrid
        data={fulllist as Product[]}
        />
    </div>
  )
}

export default Product