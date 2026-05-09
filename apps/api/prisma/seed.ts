import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL! 
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Create Users
  const adminPasswordHash = bcrypt.hashSync('admin123', 10);
  const userPasswordHash = bcrypt.hashSync('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@store.com' },
    update: {},
    create: {
      email: 'admin@store.com',
      name: 'Admin User',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
    },
  });

  console.log({ admin });

  const customer1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      passwordHash: userPasswordHash,
      role: 'CUSTOMER',
    },
  });

  const customer2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      name: 'Jane Doe',
      passwordHash: userPasswordHash,
      role: 'CUSTOMER',
    },
  });

  // 2. Create Categories
  const categories = [
    { name: 'Tops', slug: 'tops' },
    { name: 'Bottoms', slug: 'bottoms' },
    { name: 'Dresses', slug: 'dresses' },
    { name: 'Outerwear', slug: 'outerwear' },
    { name: 'Accessories', slug: 'accessories' },
  ];

  const createdCategories: any[] = [];
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories.push(category);
  }

  console.log(`Created ${createdCategories.length} categories.`);

  // 3. Create Products with realistic data
  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Olive', hex: '#556B2F' },
    { name: 'Beige', hex: '#F5F5DC' },
  ];

  const productsData = [
    {
      name: 'Classic Trench Coat',
      slug: 'classic-trench-coat',
      description: 'A timeless trench coat made from water-resistant cotton gabardine. Perfect for layering.',
      price: 199.99,
      categorySlug: 'outerwear',
      imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format',
    },
    {
      name: 'High-Rise Straight Jeans',
      slug: 'high-rise-straight-jeans',
      description: 'Classic straight-leg jeans with a flattering high rise. Made from organic cotton denim.',
      price: 89.99,
      categorySlug: 'bottoms',
      imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format',
    },
    {
      name: 'Minimalist Slip Dress',
      slug: 'minimalist-slip-dress',
      description: 'A sleek and simple slip dress made from sand-washed silk. Effortlessly elegant.',
      price: 129.99,
      categorySlug: 'dresses',
      imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format',
    },
    {
      name: 'Oversized Cashmere Sweater',
      slug: 'oversized-cashmere-sweater',
      description: 'Luxuriously soft cashmere sweater with a relaxed, oversized fit. Cozy and chic.',
      price: 159.99,
      categorySlug: 'tops',
      imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format',
    },
    {
      name: 'Leather Crossbody Bag',
      slug: 'leather-crossbody-bag',
      description: 'Italian leather crossbody bag with adjustable strap and gold hardware. Compact yet spacious.',
      price: 149.99,
      categorySlug: 'accessories',
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format',
    },
    {
      name: 'Tailored Wool Blazer',
      slug: 'tailored-wool-blazer',
      description: 'Structured blazer made from a premium wool blend. Features a modern, slightly oversized silhouette.',
      price: 179.99,
      categorySlug: 'outerwear',
      imageUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=500&auto=format',
    },
    {
      name: 'Silk Button-Down Shirt',
      slug: 'silk-button-down-shirt',
      description: 'Classic button-down shirt made from 100% pure silk. A versatile wardrobe staple.',
      price: 99.99,
      categorySlug: 'tops',
      imageUrl: 'https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?w=500&auto=format',
    },
    {
      name: 'Pleated Midi Skirt',
      slug: 'pleated-midi-skirt',
      description: 'Flowy pleated midi skirt with an elasticated waistband. Moves beautifully.',
      price: 69.99,
      categorySlug: 'bottoms',
      imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format',
    },
    {
      name: 'Floral Wrap Dress',
      slug: 'floral-wrap-dress',
      description: 'Vibrant floral print wrap dress with a tie waist. Perfect for spring and summer.',
      price: 119.99,
      categorySlug: 'dresses',
      imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format',
    },
    {
      name: 'Gold Hoop Earrings',
      slug: 'gold-hoop-earrings',
      description: 'Classic medium-sized hoop earrings made from 14k gold-plated brass. Lightweight and perfect for daily wear.',
      price: 39.99,
      categorySlug: 'accessories',
      imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format',
    }
  ];

  for (const p of productsData) {
    const category = createdCategories.find((c: any) => c.slug === p.categorySlug);
    if (!category) continue;

    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        categoryId: category.id,
        isPublished: true,
        isFeatured: true,
        totalStock: 100,
        images: {
          create: [
            {
              url: p.imageUrl,
              altText: p.name,
              position: 0,
            },
          ],
        },
        variants: {
          create: colors.flatMap((color) =>
            sizes.map((size) => ({
              size,
              color: color.name,
              colorHex: color.hex,
              stock: 5,
              sku: `PROD-${p.slug.toUpperCase()}-${color.name.substring(0, 3).toUpperCase()}-${size}`,
              price: p.price,
            }))
          ),
        },
      },
    });
    console.log(`Created product: ${product.name}`);
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
