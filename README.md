# Elvaré — Ethereal Fashion E-Commerce

Elvaré is a premium, full-stack fashion e-commerce platform built with a modern tech stack. It features a sleek, dark-themed storefront and a powerful admin dashboard for operators.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand (Cart & Wishlist)
- **Forms**: React Hook Form + Zod
- **Auth**: NextAuth.js (Credentials Provider)

### Backend
- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Storage**: Cloudinary (Image Uploads)
- **Payments**: Razorpay

### Monorepo
- **Package Manager**: `pnpm` with Workspaces

## 🛠️ Features

### Storefront
- **Ethereal Design**: Custom dark-mode aesthetic with glow effects and premium typography.
- **Product Browsing**: Filter by category, price, and sort by relevance or price.
- **Interactive Cart**: Drawer-based cart with real-time updates.
- **Wishlist**: Save favorite items for later.
- **Checkout**: Seamless flow with Razorpay payment gateway integration.
- **User Accounts**: Profile management and order history tracking.

### Admin Dashboard
- **Analytics**: Overview of revenue, orders, and products.
- **Product Management**: Add, edit, and delete products with image upload support.
- **Order Management**: Track and update order statuses.

## 🔄 Working Flow

1. **User Flow**:
   - User arrives at the landing page → browses categories/featured products.
   - User goes to shop → filters and selects a product.
   - User adds product to cart → proceeds to checkout.
   - User logs in/registers → enters delivery details → pays via Razorpay.
   - Order is created and visible in user profile.

2. **Admin Flow**:
   - Admin logs in → accesses `/admin` dashboard.
   - Admin manages inventory, uploads product images via Cloudinary, and updates order statuses.

## 📦 Project Structure

```text
├── apps
│   ├── api          # NestJS Backend
│   └── web          # Next.js Frontend
├── package.json     # Root package.json (Workspaces)
└── pnpm-workspace.yaml
```

## 🛠️ Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Dzyu-cyber/elvare-fullstack-website.git
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables in `apps/api/.env` and `apps/web/.env.local` (refer to `.env.example` if available).
4. Run development servers:
   ```bash
   pnpm dev
   ```
