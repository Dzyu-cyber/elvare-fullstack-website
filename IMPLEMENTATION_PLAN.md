# 🛍️ Fashion E-Commerce — Full Implementation Plan
> Agent Reference Document | Senior Engineer Level
> Stack: Next.js · NestJS · PostgreSQL · Prisma · Stripe/Razorpay · Vercel · Railway

---

## 📐 Project Overview

A production-grade fashion e-commerce platform with:
- Customer-facing storefront (browse, search, cart, checkout)
- Admin dashboard (product/order/inventory management)
- Secure auth, payments, image hosting
- Deployable on Vercel + Railway

**Freelance-ready. Portfolio-ready. FAANG-impressive.**

---

## 🎨 Design System (LOCK THIS IN FIRST — All Components Must Reference This)

### Color Palette
```
--color-bg:           #0C0D0C   (near-black with green tint)
--color-surface:      #141614   (card/panel backgrounds)
--color-surface-2:    #1C1F1C   (elevated surfaces)
--color-border:       #2A2E2A   (subtle borders)
--color-primary:      #22C55E   (green-500 — primary actions)
--color-primary-dark: #16A34A   (green-600 — hover states)
--color-primary-glow: #22C55E26 (green with 15% opacity — glow/highlights)
--color-accent:       #4ADE80   (green-400 — highlights, badges)
--color-text-primary: #F0FDF4   (near-white with green tint)
--color-text-secondary:#A3AFA3  (muted text)
--color-text-muted:   #6B736B   (very muted)
--color-danger:       #EF4444
--color-warning:      #F59E0B
--color-success:      #22C55E
```

### Typography
```
Display Font:   "Cormorant Garamond" (editorial luxury — Google Fonts)
Heading Font:   "DM Sans" (clean, modern — Google Fonts)
Body Font:      "DM Sans"
Mono Font:      "JetBrains Mono" (prices, codes)

Scale:
--text-xs:    0.75rem
--text-sm:    0.875rem
--text-base:  1rem
--text-lg:    1.125rem
--text-xl:    1.25rem
--text-2xl:   1.5rem
--text-3xl:   1.875rem
--text-4xl:   2.25rem
--text-5xl:   3rem
--text-6xl:   3.75rem
--text-hero:  5rem (clamp(3rem, 8vw, 5rem))
```

### Spacing & Radius
```
Container max-width: 1280px, padding: 0 24px
Section padding:     80px vertical (48px mobile)
Card radius:         12px
Button radius:       8px
Input radius:        8px
Pill radius:         999px
```

### Motion Rules (Framer Motion)
```
Page transitions:   fade + slight Y shift (0→1 opacity, 20px→0 Y, 0.4s ease)
Card hover:         translateY(-4px), scale(1.01), shadow increase — 0.2s
Button hover:       brightness(1.1), scale(1.02) — 0.15s
Scroll reveals:     opacity 0→1, Y 30px→0, 0.5s, staggered 0.1s delay
Loading skeleton:   pulse animation
NO heavy animations. Clean, professional, intentional motion only.
```

### Component Design Language
- Dark surfaces with subtle green-tinted borders
- Green accent on interactive elements
- Subtle green glow on primary CTAs (`box-shadow: 0 0 20px var(--color-primary-glow)`)
- Clean white product imagery on dark cards
- Monochromatic with green as the only pop of color
- Minimalist icons (Lucide React)

---

## 🗂️ Project Structure

```
fashion-store/
├── apps/
│   ├── web/                          # Next.js frontend
│   │   ├── app/
│   │   │   ├── (store)/              # Customer-facing routes
│   │   │   │   ├── page.tsx          # Home
│   │   │   │   ├── shop/page.tsx     # Product listing
│   │   │   │   ├── shop/[slug]/page.tsx  # Product detail
│   │   │   │   ├── cart/page.tsx
│   │   │   │   ├── checkout/page.tsx
│   │   │   │   ├── orders/page.tsx
│   │   │   │   ├── account/page.tsx
│   │   │   │   └── auth/
│   │   │   │       ├── login/page.tsx
│   │   │   │       └── register/page.tsx
│   │   │   ├── (admin)/              # Admin routes
│   │   │   │   ├── admin/page.tsx    # Dashboard
│   │   │   │   ├── admin/products/   # Product management
│   │   │   │   ├── admin/orders/     # Order management
│   │   │   │   └── admin/analytics/ # Analytics
│   │   │   ├── api/                  # Next.js API routes (auth only)
│   │   │   │   └── auth/[...nextauth]/route.ts
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── ui/                   # Base design system components
│   │   │   ├── store/                # Store-specific components
│   │   │   ├── admin/                # Admin components
│   │   │   └── layout/               # Navbar, Footer, etc.
│   │   ├── lib/
│   │   │   ├── api.ts                # API client (axios/fetch wrapper)
│   │   │   ├── auth.ts               # NextAuth config
│   │   │   └── utils.ts
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── store/                    # Zustand state (cart, wishlist)
│   │   ├── types/                    # TypeScript types
│   │   └── public/
│   │
│   └── api/                          # NestJS backend
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── auth/
│       │   ├── users/
│       │   ├── products/
│       │   ├── categories/
│       │   ├── cart/
│       │   ├── orders/
│       │   ├── payments/
│       │   ├── uploads/
│       │   ├── admin/
│       │   └── prisma/
│       └── prisma/
│           ├── schema.prisma
│           └── seed.ts
├── package.json                      # Root (pnpm workspaces)
└── .env.example
```

---

## 🗄️ Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String?
  role          Role      @default(CUSTOMER)
  avatar        String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  addresses     Address[]
  orders        Order[]
  cart          Cart?
  wishlist      WishlistItem[]
  reviews       Review[]
}

enum Role {
  CUSTOMER
  ADMIN
}

model Address {
  id         String  @id @default(cuid())
  userId     String
  user       User    @relation(fields: [userId], references: [id])
  name       String
  line1      String
  line2      String?
  city       String
  state      String
  pincode    String
  country    String  @default("India")
  phone      String
  isDefault  Boolean @default(false)
  orders     Order[]
}

model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String?
  imageUrl    String?
  parentId    String?
  parent      Category? @relation("CategoryTree", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryTree")
  products    Product[]
  createdAt   DateTime  @default(now())
}

model Product {
  id            String    @id @default(cuid())
  name          String
  slug          String    @unique
  description   String
  price         Decimal   @db.Decimal(10, 2)
  comparePrice  Decimal?  @db.Decimal(10, 2)
  categoryId    String
  category      Category  @relation(fields: [categoryId], references: [id])
  images        ProductImage[]
  variants      ProductVariant[]
  tags          String[]
  isPublished   Boolean   @default(false)
  isFeatured    Boolean   @default(false)
  totalStock    Int       @default(0)
  soldCount     Int       @default(0)
  rating        Float     @default(0)
  reviewCount   Int       @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  cartItems     CartItem[]
  orderItems    OrderItem[]
  wishlistItems WishlistItem[]
  reviews       Review[]
}

model ProductImage {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  url       String
  altText   String?
  position  Int     @default(0)
}

model ProductVariant {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  size      String?
  color     String?
  colorHex  String?
  stock     Int     @default(0)
  sku       String  @unique
  price     Decimal? @db.Decimal(10, 2)

  cartItems  CartItem[]
  orderItems OrderItem[]
}

model Cart {
  id        String     @id @default(cuid())
  userId    String?    @unique
  user      User?      @relation(fields: [userId], references: [id])
  sessionId String?    @unique
  items     CartItem[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model CartItem {
  id        String         @id @default(cuid())
  cartId    String
  cart      Cart           @relation(fields: [cartId], references: [id], onDelete: Cascade)
  productId String
  product   Product        @relation(fields: [productId], references: [id])
  variantId String?
  variant   ProductVariant? @relation(fields: [variantId], references: [id])
  quantity  Int            @default(1)
}

model WishlistItem {
  id        String  @id @default(cuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  createdAt DateTime @default(now())

  @@unique([userId, productId])
}

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  addressId       String
  address         Address     @relation(fields: [addressId], references: [id])
  items           OrderItem[]
  subtotal        Decimal     @db.Decimal(10, 2)
  shippingCost    Decimal     @db.Decimal(10, 2) @default(0)
  discount        Decimal     @db.Decimal(10, 2) @default(0)
  total           Decimal     @db.Decimal(10, 2)
  status          OrderStatus @default(PENDING)
  paymentStatus   PaymentStatus @default(PENDING)
  paymentMethod   String?
  paymentId       String?
  notes           String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

model OrderItem {
  id        String         @id @default(cuid())
  orderId   String
  order     Order          @relation(fields: [orderId], references: [id])
  productId String
  product   Product        @relation(fields: [productId], references: [id])
  variantId String?
  variant   ProductVariant? @relation(fields: [variantId], references: [id])
  quantity  Int
  price     Decimal        @db.Decimal(10, 2)
  name      String
  imageUrl  String?
}

model Review {
  id        String  @id @default(cuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  rating    Int
  title     String?
  body      String?
  createdAt DateTime @default(now())

  @@unique([userId, productId])
}
```

---

## 🔌 API Endpoints Reference

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/auth/refresh
```

### Products
```
GET    /api/products                  # List (filter: category, size, color, price, sort)
GET    /api/products/:slug            # Single product
GET    /api/products/featured         # Featured products
GET    /api/products/search?q=        # Search
POST   /api/products                  # [ADMIN] Create
PATCH  /api/products/:id              # [ADMIN] Update
DELETE /api/products/:id              # [ADMIN] Delete
POST   /api/products/:id/images       # [ADMIN] Upload images
```

### Categories
```
GET    /api/categories
GET    /api/categories/:slug
POST   /api/categories                # [ADMIN]
PATCH  /api/categories/:id            # [ADMIN]
```

### Cart
```
GET    /api/cart
POST   /api/cart/items
PATCH  /api/cart/items/:id
DELETE /api/cart/items/:id
DELETE /api/cart                      # Clear cart
```

### Wishlist
```
GET    /api/wishlist
POST   /api/wishlist/:productId
DELETE /api/wishlist/:productId
```

### Orders
```
POST   /api/orders                    # Create order
GET    /api/orders                    # User's orders
GET    /api/orders/:id                # Single order
POST   /api/orders/:id/cancel         # Cancel order
GET    /api/admin/orders              # [ADMIN] All orders
PATCH  /api/admin/orders/:id/status   # [ADMIN] Update status
```

### Payments
```
POST   /api/payments/create-intent    # Stripe payment intent
POST   /api/payments/razorpay/create  # Razorpay order
POST   /api/payments/webhook          # Payment webhook
```

### Uploads
```
POST   /api/uploads/image             # [ADMIN] Cloudinary upload
```

### Admin
```
GET    /api/admin/dashboard           # Stats overview
GET    /api/admin/analytics           # Sales data
```

---

## 📦 Environment Variables

```env
# apps/api/.env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
FRONTEND_URL="http://localhost:3000"

# apps/web/.env.local
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
NEXT_PUBLIC_RAZORPAY_KEY_ID=""
```

---

---

# 🚀 PHASE-BY-PHASE IMPLEMENTATION PLAN

---

## PHASE 1 — Monorepo & Project Scaffolding

**Goal:** Create the full project skeleton — runnable, clean, zero errors.

### Tasks:
1. Initialize root with `pnpm-workspace.yaml`:
   ```yaml
   packages:
     - "apps/*"
   ```
2. Create `apps/web` — Next.js 14 with App Router, TypeScript, Tailwind CSS
   ```bash
   pnpm create next-app@latest apps/web --typescript --tailwind --app --src-dir=false
   ```
3. Create `apps/api` — NestJS with TypeScript
   ```bash
   npx @nestjs/cli new apps/api
   ```
4. Configure root `package.json` scripts:
   ```json
   {
     "scripts": {
       "dev:web": "pnpm --filter web dev",
       "dev:api": "pnpm --filter api start:dev",
       "dev": "concurrently \"pnpm dev:web\" \"pnpm dev:api\""
     }
   }
   ```
5. Create `.env.example`, `.gitignore`, `README.md`
6. Initialize git repository

**Deliverable:** Both apps start without errors. `pnpm dev` runs both concurrently.

---

## PHASE 2 — Design System & Tailwind Configuration

**Goal:** Establish the entire visual language. Every future component references this.

### Tasks:
1. Configure `tailwind.config.ts` with custom design tokens:
   ```ts
   theme: {
     extend: {
       colors: {
         bg: '#0C0D0C',
         surface: '#141614',
         'surface-2': '#1C1F1C',
         border: '#2A2E2A',
         primary: '#22C55E',
         'primary-dark': '#16A34A',
         accent: '#4ADE80',
         'text-primary': '#F0FDF4',
         'text-secondary': '#A3AFA3',
         'text-muted': '#6B736B',
       },
       fontFamily: {
         display: ['Cormorant Garamond', 'serif'],
         sans: ['DM Sans', 'sans-serif'],
         mono: ['JetBrains Mono', 'monospace'],
       },
       boxShadow: {
         'glow-green': '0 0 20px rgba(34,197,94,0.15)',
         'glow-green-md': '0 0 40px rgba(34,197,94,0.2)',
         card: '0 4px 24px rgba(0,0,0,0.4)',
       },
       animation: {
         'fade-in': 'fadeIn 0.4s ease forwards',
         'slide-up': 'slideUp 0.5s ease forwards',
         skeleton: 'skeleton 1.5s ease-in-out infinite',
       }
     }
   }
   ```
2. Create `app/globals.css` with CSS variables matching design system above
3. Add Google Fonts in `app/layout.tsx` (`Cormorant Garamond`, `DM Sans`, `JetBrains Mono`)
4. Install core dependencies:
   ```bash
   pnpm add framer-motion lucide-react zustand @tanstack/react-query axios clsx tailwind-merge
   ```
5. Create `lib/utils.ts` with `cn()` utility (clsx + tailwind-merge)
6. Build base UI components in `components/ui/`:
   - `Button.tsx` — variants: primary, secondary, ghost, danger. sizes: sm, md, lg
   - `Badge.tsx` — variants: green, muted, danger, warning
   - `Input.tsx` — dark styled with green focus ring
   - `Select.tsx`
   - `Card.tsx` — surface background, border, optional glow
   - `Skeleton.tsx` — animated loading placeholder
   - `Modal.tsx` — framer motion overlay
   - `Spinner.tsx`
   - `Divider.tsx`
   - `Toast.tsx` (use react-hot-toast)

**Deliverable:** Storybook-style test page at `/dev` showing all components rendered correctly.

---

## PHASE 3 — Layout Components (Navbar + Footer)

**Goal:** Build the persistent shell that wraps every page.

### Navbar Specs:
- Sticky top, `backdrop-blur-md`, dark background with slight transparency
- Left: Logo ("VÉRDE" or brand name in Cormorant Garamond italic)
- Center: Nav links — Home, Shop, Collections, About
- Right: Search icon, Wishlist icon (count badge), Cart icon (count badge), User icon
- Mobile: Hamburger menu → full-screen slide-down menu
- Active link: green underline accent

### Footer Specs:
- Dark surface, 4 column grid
- Col 1: Brand logo + tagline + social icons (Instagram, Pinterest, Twitter)
- Col 2: Shop links (All Products, New Arrivals, Sale, Collections)
- Col 3: Help (Shipping, Returns, Size Guide, FAQ)
- Col 4: Newsletter signup (email input + button)
- Bottom bar: copyright + "Built with ♥" note

### Tasks:
1. `components/layout/Navbar.tsx`
2. `components/layout/MobileMenu.tsx`
3. `components/layout/Footer.tsx`
4. `components/layout/CartDrawer.tsx` (slide-in from right, framer motion)
5. Wrap `app/layout.tsx` with Navbar + Footer + Providers

**Deliverable:** Fully functional navbar and footer on all pages. Cart drawer opens/closes smoothly.

---

## PHASE 4 — Database Setup & Prisma (Backend)

**Goal:** Database running, schema migrated, seed data inserted.

### Tasks:
1. Install Prisma in `apps/api`:
   ```bash
   pnpm add prisma @prisma/client
   npx prisma init
   ```
2. Paste the full schema from the Schema section above into `prisma/schema.prisma`
3. Set `DATABASE_URL` in `.env` (local PostgreSQL or Railway)
4. Run:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
5. Create `prisma/seed.ts`:
   - 5 categories: Tops, Bottoms, Dresses, Outerwear, Accessories
   - 20 sample products with variants (S/M/L/XL, multiple colors)
   - 1 admin user (admin@store.com / admin123)
   - 3 customer users
6. Add `prisma.service.ts` in NestJS (`src/prisma/prisma.service.ts`)
7. Register `PrismaModule` as global in `app.module.ts`

**Deliverable:** `npx prisma studio` shows all tables with seed data.

---

## PHASE 5 — NestJS Backend Foundation

**Goal:** API server running with proper structure, CORS, validation, error handling.

### Tasks:
1. Install dependencies:
   ```bash
   pnpm add @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcryptjs class-validator class-transformer
   pnpm add -D @types/bcryptjs @types/passport-jwt
   ```
2. Configure `ConfigModule` (global, `.env` loaded)
3. Set up global pipes:
   ```ts
   app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
   ```
4. Configure CORS for frontend URL
5. Set global prefix: `app.setGlobalPrefix('api')`
6. Create global exception filter (`HttpExceptionFilter`)
7. Create response interceptor (standardize response shape):
   ```json
   { "success": true, "data": {}, "message": "OK" }
   ```
8. Set port to 4000

**Deliverable:** `GET http://localhost:4000/api` returns `{ "success": true, "message": "Fashion Store API v1" }`

---

## PHASE 6 — Authentication (Backend)

**Goal:** Complete JWT-based auth with register, login, refresh tokens.

### Tasks:
1. Create `src/auth/auth.module.ts`, `auth.service.ts`, `auth.controller.ts`
2. Create `src/users/users.module.ts`, `users.service.ts`
3. Implement:
   - `register(dto)` — hash password with bcrypt (rounds: 12), create user, return tokens
   - `login(dto)` — verify credentials, return access + refresh tokens
   - `refreshToken(token)` — validate refresh, issue new access token
   - `getMe(userId)` — return current user
4. JWT Strategy: access token (15min), refresh token (7d)
5. `JwtAuthGuard` — protect routes
6. `RolesGuard` — `@Roles('ADMIN')` decorator
7. DTOs with validation:
   - `RegisterDto`: email, name, password (min 8 chars)
   - `LoginDto`: email, password

**Deliverable:** Postman/curl tests pass for register → login → getMe flow.

---

## PHASE 7 — Authentication (Frontend)

**Goal:** Login, Register pages + NextAuth session management.

### Tasks:
1. Install: `pnpm add next-auth`
2. Configure `app/api/auth/[...nextauth]/route.ts`:
   - Credentials provider (calls `POST /api/auth/login`)
   - JWT strategy storing access token in session
3. Create `lib/auth.ts` with `authOptions`
4. Create `hooks/useAuth.ts` — wrapper around `useSession`
5. Build pages:
   - `app/auth/login/page.tsx` — email/password form, error states, redirect on success
   - `app/auth/register/page.tsx` — name/email/password form
6. Add `middleware.ts` — protect `/account/*`, `/checkout/*`, `/orders/*`, `/admin/*`
7. User menu dropdown in Navbar (sign in / account / orders / sign out)

**Design notes:**
- Full-page dark layout, centered card
- Brand logo at top
- Green CTA button
- Links to switch between login/register

**Deliverable:** User can register, log in, see their name in navbar, log out.

---

## PHASE 8 — Products API (Backend)

**Goal:** Full CRUD for products with filtering, pagination, search.

### Tasks:
1. Create `src/products/` module with service + controller
2. Implement endpoints:
   - `GET /products` with query params:
     - `category` (slug)
     - `minPrice`, `maxPrice`
     - `size`, `color`
     - `sort`: `newest | price-asc | price-desc | popular`
     - `featured`: boolean
     - `page`, `limit` (default 20)
     - `q`: text search (use Prisma `contains`)
   - `GET /products/:slug`
   - `POST /products` [ADMIN]
   - `PATCH /products/:id` [ADMIN]
   - `DELETE /products/:id` [ADMIN]
3. Create `src/categories/` module
4. Product response should include: images, variants, category, rating
5. Use Prisma `select` to avoid over-fetching

**Deliverable:** All product endpoints respond correctly with test data.

---

## PHASE 9 — Home Page

**Goal:** Stunning, professional homepage that sells the brand.

### Sections (top to bottom):

#### 9.1 Hero Section
- Full viewport height
- Left: Large editorial text (Cormorant Garamond), headline, subtext, 2 CTAs
- Right: Large product image (or split layout)
- Subtle green gradient glow behind CTA button
- Framer Motion: text fades + slides in on load

#### 9.2 Category Strip
- Horizontal scrollable row of category cards
- Each: image/placeholder + category name
- Hover: green border + slight lift

#### 9.3 Featured Products
- Grid of 4 featured products
- Fetch from `GET /api/products?featured=true&limit=4`
- "Shop All" link

#### 9.4 Brand Values Strip
- 3-4 column strip: Free Shipping | Easy Returns | Sustainable Fashion | 24/7 Support
- Icon + heading + short text per item

#### 9.5 New Arrivals
- Grid of 4 newest products
- "View All New" link

#### 9.6 Newsletter Section
- Dark surface section
- Heading + subtext + email input + subscribe button
- Store in local state only (no backend needed for MVP)

### Tasks:
1. `components/store/ProductCard.tsx` — image, name, price, hover overlay with quick-add
2. `components/store/HeroSection.tsx`
3. `components/store/CategoryStrip.tsx`
4. `components/store/FeaturedProducts.tsx`
5. `components/store/BrandValues.tsx`
6. `components/store/Newsletter.tsx`
7. `app/(store)/page.tsx` — compose all sections with scroll reveal animations

**Deliverable:** Home page renders with real data from API. Looks premium.

---

## PHASE 10 — Product Listing Page (Shop)

**Goal:** Browseable product catalog with filters and pagination.

### Layout:
- Desktop: Left sidebar (filters) + Right product grid
- Mobile: Filter button → modal/drawer overlay

### Filter Sidebar:
- Category checkboxes
- Price range slider (min/max inputs)
- Size checkboxes (XS, S, M, L, XL, XXL)
- Color swatches
- "Clear All Filters" button

### Product Grid:
- 3 columns desktop, 2 tablet, 1 mobile
- Sort dropdown (Newest, Price ↑, Price ↓, Popular)
- Total count display ("Showing 24 of 120 products")
- Pagination (load more button or numbered)
- Loading skeletons

### Tasks:
1. `app/(store)/shop/page.tsx`
2. `components/store/FilterSidebar.tsx`
3. `components/store/FilterMobileDrawer.tsx`
4. `components/store/ProductGrid.tsx`
5. `components/store/SortDropdown.tsx`
6. `hooks/useProducts.ts` (react-query, parses URL search params as filters)
7. Sync filters to URL params (so sharing URL preserves filters)

**Deliverable:** Shop page filters and paginate correctly. URL updates on filter change.

---

## PHASE 11 — Product Detail Page

**Goal:** Rich product page that converts browsers to buyers.

### Layout:
- Left: Image gallery (main image + thumbnail row, click to switch)
- Right: Product info

### Right Panel Contents:
- Category breadcrumb
- Product name (Cormorant Garamond, large)
- Rating stars + review count
- Price (and compare-at price if on sale, strikethrough + "SALE" badge)
- Color selector (swatches, green ring on selected)
- Size selector (pill buttons, green highlight on selected)
- Stock status ("Only 3 left!" if stock < 5)
- Quantity selector
- Add to Cart button (full width, green, glow)
- Add to Wishlist button (ghost)
- Accordion sections: Description | Size Guide | Shipping & Returns

### Below fold:
- Reviews section (list of reviews + star breakdown)
- Related Products (4 cards, same category)

### Tasks:
1. `app/(store)/shop/[slug]/page.tsx` (server component, fetch product by slug)
2. `components/store/ProductGallery.tsx`
3. `components/store/VariantSelector.tsx` (color + size)
4. `components/store/QuantitySelector.tsx`
5. `components/store/ReviewsList.tsx`
6. `components/store/RelatedProducts.tsx`

**Deliverable:** Full product page with variant selection and add-to-cart working.

---

## PHASE 12 — Cart (Backend + Frontend)

**Goal:** Persistent cart that survives page refresh, syncs on login.

### Backend Tasks:
1. `src/cart/cart.module.ts`, `cart.service.ts`, `cart.controller.ts`
2. Cart logic:
   - Guest cart: tied to `sessionId` (UUID stored in cookie)
   - User cart: tied to `userId`
   - On login: merge guest cart into user cart
3. Endpoints: GET, POST (add item), PATCH (update qty), DELETE (remove item), DELETE /clear

### Frontend Tasks:
1. Zustand store `store/cart.ts`:
   ```ts
   interface CartStore {
     items: CartItem[]
     itemCount: number
     total: number
     addItem: (product, variant, qty) => void
     removeItem: (itemId) => void
     updateQty: (itemId, qty) => void
     clearCart: () => void
     syncWithServer: () => void
   }
   ```
2. `components/layout/CartDrawer.tsx` — slide in from right, list items, subtotal, checkout CTA
3. Optimistic updates (update UI immediately, sync to server in background)
4. Persist cart to localStorage for guests

**Deliverable:** Add items to cart → refresh page → items still there. Login → cart merges.

---

## PHASE 13 — Wishlist

**Goal:** Simple save-for-later functionality.

### Tasks:
1. Backend: `src/wishlist/` — add, remove, list (auth required)
2. Zustand store `store/wishlist.ts`
3. Heart icon on ProductCard toggles wishlist state (green when saved)
4. `app/(store)/account/wishlist/page.tsx` — grid of saved items

**Deliverable:** Wishlist persists across sessions for logged-in users.

---

## PHASE 14 — Checkout Flow

**Goal:** Complete checkout — address → payment → confirmation.

### 3-Step Flow:
1. **Bag Review** — cart items summary, edit quantities
2. **Delivery** — add/select address
3. **Payment** — Stripe/Razorpay + order placement

### Tasks:
1. `app/(store)/checkout/page.tsx` — step wizard (stepper component)
2. `components/store/checkout/CartReview.tsx`
3. `components/store/checkout/DeliveryStep.tsx`:
   - List saved addresses (select one)
   - "Add new address" form
4. `components/store/checkout/PaymentStep.tsx`:
   - Order summary sidebar
   - Razorpay integration (recommended for India):
     ```ts
     // Create Razorpay order on backend
     // Load Razorpay script client-side
     // On success: POST /api/orders with paymentId
     ```
5. `app/(store)/checkout/success/page.tsx` — animated success state, order number, email note
6. Backend `src/orders/orders.service.ts`:
   - `createOrder(userId, dto)` — create order, reduce stock, clear cart
   - `src/payments/` module for Razorpay/Stripe

**Deliverable:** Full checkout flow places a real order. Order appears in DB.

---

## PHASE 15 — User Account Pages

**Goal:** Personal dashboard for customers.

### Pages:
1. `app/(store)/account/page.tsx` — overview: recent orders, profile summary
2. `app/(store)/account/orders/page.tsx` — order history list
3. `app/(store)/account/orders/[id]/page.tsx` — order detail + status timeline
4. `app/(store)/account/profile/page.tsx` — edit name, email, password
5. `app/(store)/account/addresses/page.tsx` — manage saved addresses

### Tasks:
1. Account layout with left sidebar nav
2. `components/store/OrderCard.tsx` — order summary card
3. `components/store/OrderStatusTimeline.tsx` — visual status tracker
4. Address CRUD forms

**Deliverable:** Users can view their orders and manage their profile.

---

## PHASE 16 — Admin Dashboard

**Goal:** Operators can manage products and orders without touching the DB.

### Admin Layout:
- Left sidebar navigation (always visible on desktop)
- Top bar with admin user info
- Protected: only `ADMIN` role users can access `/admin/*`

### Pages:

#### 16.1 Dashboard Overview (`/admin`)
- Stats cards: Total Revenue, Orders Today, Total Products, Active Users
- Recent orders table
- Low stock alerts

#### 16.2 Products (`/admin/products`)
- Table: image thumbnail, name, category, price, stock, status (published/draft)
- Filters: category, status
- "Add Product" button
- Bulk actions: publish/unpublish, delete

#### 16.3 Add/Edit Product (`/admin/products/new`, `/admin/products/[id]/edit`)
- Form fields: name, slug (auto-generated), description (textarea), category, price, comparePrice, tags
- Image upload section (drag-and-drop → Cloudinary)
- Variants builder: add size/color combinations with stock and SKU
- Toggle: published, featured
- Save / Save as Draft

#### 16.4 Orders (`/admin/orders`)
- Table: order number, customer, date, total, payment status, order status
- Filter by status
- Click row → order detail modal
- Change order status dropdown

#### 16.5 Cloudinary Image Upload:
```ts
// Backend endpoint POST /api/uploads/image
// Receives multipart form data
// Uploads to Cloudinary
// Returns { url, publicId }
```

### Tasks:
1. `app/(admin)/admin/layout.tsx` — sidebar + auth guard
2. `components/admin/AdminSidebar.tsx`
3. `components/admin/StatsCard.tsx`
4. `components/admin/ProductsTable.tsx`
5. `components/admin/ProductForm.tsx`
6. `components/admin/ImageUploader.tsx` (drag and drop, preview, upload to API)
7. `components/admin/OrdersTable.tsx`
8. Backend uploads module with Cloudinary SDK

**Deliverable:** Admin can add a new product with images, update order statuses.

---

## PHASE 17 — Image Upload & Cloudinary

**Goal:** All product images hosted on Cloudinary with optimized delivery.

### Tasks:
1. Install: `pnpm add cloudinary multer @nestjs/multer`
2. Create `src/uploads/uploads.module.ts`, `uploads.controller.ts`, `uploads.service.ts`
3. Service method:
   ```ts
   async uploadImage(file: Express.Multer.File): Promise<{ url: string; publicId: string }>
   // Upload to Cloudinary folder: 'fashion-store/products'
   // Transformation: quality auto, format auto, max width 1200
   ```
4. Frontend `ImageUploader` component:
   - Drag-and-drop zone (styled with dashed border, green on dragover)
   - Shows preview thumbnails
   - Calls `POST /api/uploads/image`
   - Returns URL to parent form

**Deliverable:** Admin can drag-drop images in product form → they appear in Cloudinary dashboard.

---

## PHASE 18 — Polish, SEO & Performance

**Goal:** Production-ready quality before deployment.

### Tasks:
1. **SEO**:
   - `generateMetadata()` on all pages (title, description, OG image)
   - Product pages: structured data (JSON-LD Schema.org Product)
   - Sitemap: `app/sitemap.ts`
   - Robots.txt: `app/robots.ts`

2. **Performance**:
   - All product images: `next/image` with `sizes` prop
   - Lazy load below-fold sections
   - React Query caching configuration (staleTime, gcTime)
   - `loading.tsx` for all route segments

3. **Error Handling**:
   - `error.tsx` for all route segments
   - `not-found.tsx` (404 page with green styling)
   - API error boundary in react-query

4. **Accessibility**:
   - Focus visible rings on all interactive elements
   - ARIA labels on icon buttons
   - Skip to main content link

5. **Mobile Polish**:
   - Test all pages at 375px, 768px, 1280px
   - Fix any overflow issues
   - Ensure cart drawer works on mobile

**Deliverable:** Lighthouse score 85+ on performance, 95+ on accessibility/SEO.

---

## PHASE 19 — Deployment

**Goal:** Live URLs for both frontend and backend.

### Backend (Railway):
1. Push `apps/api` to GitHub
2. Create Railway project → deploy from GitHub
3. Add PostgreSQL plugin in Railway
4. Set all environment variables
5. Run migrations: `npx prisma migrate deploy`
6. Run seed: `npx ts-node prisma/seed.ts`
7. Note the backend URL (e.g., `https://fashion-api.railway.app`)

### Frontend (Vercel):
1. Push `apps/web` to GitHub
2. Import project in Vercel
3. Set root directory to `apps/web`
4. Set all environment variables (use Railway backend URL)
5. Deploy

### Post-Deployment:
1. Test complete user flow on production
2. Test admin flow on production
3. Configure Stripe/Razorpay webhooks to production URL
4. Set up Cloudinary production environment

**Deliverable:** Live URLs that work end-to-end. Share with portfolio.

---

## PHASE 20 — Final QA Checklist

Run through this entire checklist before marking the project complete:

### Customer Flow:
- [ ] Browse homepage — all sections load
- [ ] Browse shop — filters work, URL updates
- [ ] Open product — gallery, variant selection, add to cart
- [ ] Cart drawer — shows items, quantities update
- [ ] Register new account
- [ ] Login with existing account
- [ ] Checkout — address, payment (use Stripe test card: 4242 4242 4242 4242)
- [ ] Order confirmation page shows order number
- [ ] Account → Orders shows the placed order

### Admin Flow:
- [ ] Login as admin
- [ ] Create a new product with images, variants
- [ ] Product appears in storefront shop
- [ ] View all orders
- [ ] Update order status

### Cross-Device:
- [ ] Mobile (375px) — all pages usable
- [ ] Tablet (768px) — layout correct
- [ ] Desktop (1280px) — full layout

### Performance:
- [ ] No console errors
- [ ] No broken images
- [ ] All links work (no 404s)
- [ ] Forms validate and show errors

---

## 📌 Agent Instructions Summary

When executing this plan:
1. **Work phase by phase** — complete and verify each phase before moving to the next
2. **Never skip the design system** — Phase 2 tokens must be used in every component
3. **Backend before frontend** per feature — build API endpoint, test it, then build the UI
4. **Commit after each phase** — `git commit -m "Phase X: description"`
5. **Console.log nothing in production** — use proper NestJS Logger
6. **TypeScript strict mode** — no `any` types allowed
7. **All forms must have validation** — both client-side (react-hook-form + zod) and server-side (class-validator)
8. **Every component is mobile-first** — Tailwind mobile breakpoints first, then md:, lg:
9. Install react-hook-form + zod for all forms: `pnpm add react-hook-form zod @hookform/resolvers`
10. Install react-hot-toast for notifications: `pnpm add react-hot-toast`

---

*End of Implementation Plan — Version 1.0*
