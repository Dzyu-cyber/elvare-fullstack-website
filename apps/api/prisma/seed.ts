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

  // 3. Create Products (20 sample products)
  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Olive', hex: '#556B2F' },
    { name: 'Beige', hex: '#F5F5DC' },
  ];

  for (let i = 1; i <= 20; i++) {
    const categoryIndex = i % createdCategories.length;
    const category = createdCategories[categoryIndex];
    
    const product = await prisma.product.create({
      data: {
        name: `Product ${i}`,
        slug: `product-${i}`,
        description: `This is the description for Product ${i}. High quality and sustainable.`,
        price: 49.99 + i * 5,
        categoryId: category.id,
        isPublished: true,
        isFeatured: i <= 4, // Feature the first 4 products
        totalStock: 100,
        images: {
          create: [
            {
              url: `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format`,
              altText: `Product ${i} Image 1`,
              position: 0,
            },
            {
              url: `https://images.unsplash.com/photo-1529139570566-f267094fa21?w=500&auto=format`,
              altText: `Product ${i} Image 2`,
              position: 1,
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
              sku: `PROD-${i}-${color.name.substring(0, 3).toUpperCase()}-${size}`,
              price: 49.99 + i * 5,
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
