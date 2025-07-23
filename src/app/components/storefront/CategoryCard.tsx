'use client'
import React from 'react'
import { Category } from '@/app/utils/types'
import Link from 'next/link'
function CategoryCard({ info }: { info: Category }) {
    const {name,image,description,id}=info
  return (
    <Link href={`/categery/${id}`}>
    <div>
        <h2>{name}</h2>
        <p>{image}</p>
        <p>{description}</p>
    </div>
    </Link>
  )
}

export default CategoryCard