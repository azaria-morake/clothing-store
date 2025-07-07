# 👕 Next.js Clothing Store – Full-Stack E-Commerce Platform

A modern, full-stack online clothing store built with **Next.js**, featuring authentication, wishlist, basket, checkout, and support for South African payment gateways.

---

## 📦 Features

### ✅ Standard Features

- 🔐 **Secure Authentication**
  - Register, login/logout using JWT in HTTP-only cookies/user roles/ multi-session, OAuth, and MFA
- 💖 **Wishlist**
  - Logged-in users can add/remove items
- 🛒 **Basket**
  - Add products, change quantity, select sizes (only when logged in)
- 📦 **Checkout**
  - Select address, pay with **PayFast**, **Ozow**, or **Yoco**
- 📮 **CRUD Delivery Addresses**
  - Add, update, delete, view saved delivery info
- 🔁 **Returns**
  - Users can request returns; admins can review them
- 🧾 **Order Tracking**
  - View order history and payment status 
- ** auth **
  - 

---

## Tech Stack

| Layer        | Technology                     |
|--------------|---------------------------------|
| **Frontend** | Next.js                         |
| **Backend**  | Next.js API Routes              |
| **Database** | PostgreSQL + Prisma (or MongoDB + Mongoose) |
| **Auth**     | NextAuth.js with Credentials + JWT/clerk |
| **Payments** | PayFast, Ozow, Yoco             |
| **Image CDN**| Cloudinary / AWS S3             |
| **State**    | React Context API / Zustand     |
| **Testing**  | `curl`, Postman                 |
| **Deploy**   | Vercel, Railway, or Render      |
| **Email**    | Resend / Mailgun / nodemailer   |               |

---
##  Checkout & Payment

### Checkout Flow

1.  Authenticated user initiates checkout
    
2.  Sends cart + selected address
    
3.  Server calculates total
    
4.  Redirect to payment gateway (PayFast, Ozow, etc.)
    
5.  On return, verify & save order
6. 
## 🗃️ Data Models

###  User
```ts
User {
  id: string
  email: string
  password: string (hashed)
  name: string
  createdAt: Date
  updatedAt: Date
  role:string
}
```

### Features

-    Register (POST `/api/auth/register`)
    
-   Login (POST `/api/auth/login`)
    
-   Logout (GET `/api/auth/logout`)
    
-    Auth with JWT stored in HTTP-only cookies
    
-   Secure password hashing (bcrypt)
    
-   Forgot password (email token)
    
-    Account info update (PATCH `/api/user`)

### Endpoints

-   GET `/api/products` – list all
    
-   GET `/api/products/:id` – product detail
    
-   GET `/api/products/category/:cat` – by category
    
-   (Admin) POST/PUT/DELETE `/api/products`



### Product
``` ts
Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  variants: string[]
  category: string
  inStock: number
  createdAt: Date
  updatedAt: Date
}
```
### model Variant 
```ts
Variant {
  id         String   @id @default(uuid())
  productId  String
  product    Product  @relation(fields: [productId], references: [id])
  
  size       String?  // nullable if not applicable
  color      String?  // nullable if not applicable
  price      Float
  quantity   Int
  trackQty   Boolean  @default(true)

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@unique([productId, size, color]) // prevent duplicate variant entries
}
```
### Wishlist

```ts
Wishlist {
  id: string
  userId: string
  items: string[] // product IDs
}
```

### Endpoints (requires login)

-   GET `/api/wishlist` – view
    
-   POST `/api/wishlist/add` – add item
    
-   DELETE `/api/wishlist/:productId` – remove

### Cart

```ts
Cart {
  id: string
  userId: string
  items: [
    {
      productId: string
      quantity: number
      size: string
    }
  ]
}
```

### Endpoints

-   GET `/api/cart`
    
-   POST `/api/cart/add`
    
-   PATCH `/api/cart/update`
    
-   DELETE `/api/cart/:productId`

### Address

```ts
Address {
  id: string
  userId: string
  label: string
  fullName: string
  phone: string
  street: string
  city: string
  province: string
  postalCode: string
  createdAt: Date
}
```
### Endpoints (CRUD)

-   GET `/api/address`
    
-   POST `/api/address`
    
-   PUT `/api/address/:id`
    
-   DELETE `/api/address/:id`


### Order

```ts
Order {
  id: string
  userId: string
  products: [
    {
      productId: string
      quantity: number
      priceAtPurchase: number
      size: string
    }
  ]
  addressId: string
  paymentStatus: "pending" | "paid" | "failed"
  total: number
  createdAt: Date
  paymentGatewayRef: string
}
```

### Endpoints

-   POST `/api/checkout/start`
    
-   POST `/api/checkout/verify`
    
-   GET `/api/orders` (user's orders)

### Return Request

```ts
ReturnRequest {
  id: string
  userId: string
  orderId: string
  reason: string
  status: "requested" | "approved" | "rejected" | "refunded"
  createdAt: Date
}
```

### Endpoints

-   POST `/api/returns` – request return
    
-   GET `/api/returns` – view returns
    
-   PATCH `/api/returns/:id` – update status (admin)

### Folder Structure

```bash
/app
  /api
    /auth
    /products
    /wishlist
    /cart
    /checkout
    /returns
    /address
/components
/context
/hooks
/models
/prisma
/public
/styles
/utils
```
##  Deployment

-   Use **Vercel** for serverless Next.js deployments
    
-   Add `DATABASE_URL`, `JWT_SECRET`, and payment API keys in `.env.local`
    
-   Stripe or SA Payment SDKs must be installed server-side

## MVP Scope

All features above are **MVP-ready**, and we can **iterate** by adding:

-   Loyalty points
    
-   SMS notifications (Twilio)
    
-   Gift cards
    
-   Reviews & ratings
  

##  Endpoint Testing Examples (with `curl`)

### Register

```bash
`curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"azaria@example.com","password":"123456","name":"Azaria"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"azaria@example.com","password":"123456"}'
```

### Add to Wishlist

```bash
curl -X POST http://localhost:3000/api/wishlist/add \
-H "Authorization: Bearer <your_jwt_token>" \
-H "Content-Type: application/json" \
-d '{"productId":"abc123"}
```

##  Admin Panel (optional for MVP)

-   Add/edit/remove products
    
-   View all users/orders
    
-   Manage return requests
    

Admin access gated by role in JWT session.

