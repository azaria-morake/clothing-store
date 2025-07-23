'use client'
import Link from 'next/link'
import React from 'react'
interface Route {
    href: string
    label: string
  }
  function Nav({ routes }: { routes: Route[] }) {
    return (
      <nav>
        <ul>
          {routes.map((route) => (
            <li key={route.href}>
              <Link href={route.href}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
  
  export default Nav