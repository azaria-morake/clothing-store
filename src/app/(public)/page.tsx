import Image from 'next/image'
import styles from '../page.module.css'
import Hero from '../components/storefront/Hero'
import ProductGird from '../components/storefront/ProductGird'
import db from '../libs/db.json'
import CategoriesGrid from '../components/storefront/CategoriesGrid'
import { Product } from '@/app/utils/types';
import { getBestSellers, getCategory, getWeekSales } from '../libs/dbCalls'
export default async function Home() {
  // all data will be replaced with actual db data
  const {storeName}=db
 
 let catList=await getCategory()

 let bestSeller=await getBestSellers()
 let weekSale=await getWeekSales()
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
