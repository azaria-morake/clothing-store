import Image from 'next/image'
import styles from '../page.module.css'
import Hero from '../components/storefront/Hero'
import ProductGird from '../components/storefront/ProductGird'
import db from '../libs/db.json'
import CategoriesGrid from '../components/storefront/CategoriesGrid'
import { Product } from '@/app/utils/types';
export default function Home() {
  // all data will be replaced with actual db data
  const {categories,storeName}=db
 let items =categories.map((e)=>{return e.items})
 let catList=categories.map((e)=>{return {name:e.name,image:e.image, description:e.description,id:e.id }})
 let fulllist=items.flat()
 let bestSeller=fulllist.filter((e)=>{return e.bestSeller})
 let weekSale=fulllist.filter((e)=>{return e.weekSale})
  return (
    <main className={styles.main}>
    <h1>{storeName}</h1>
    <Hero/>
    <CategoriesGrid
    data={catList}/>
    <Hero/>
    <ProductGird
    data={bestSeller as Product[]}
    tag='bestSeller'
    />
    <Hero/>
    <ProductGird
    data={weekSale as Product[]}
    tag='weekSale'
    />
    </main>
  )
}
