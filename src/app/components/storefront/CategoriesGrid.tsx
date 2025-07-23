import React from 'react'
import { Category } from '@/app/utils/types'
import CategoryCard from './CategoryCard'
// Define the expected shape of each category item

  interface categoryGridProps {
    data: Category[]
  }
function CategoriesGrid({data}:categoryGridProps) {
  
  return (
    <div><h2>Categories</h2>
          {data.map((e, i) => (
        <div key={ i}>
          <CategoryCard
          info={e}
          />
        </div>
      ))}
    </div>
  )
}

export default CategoriesGrid