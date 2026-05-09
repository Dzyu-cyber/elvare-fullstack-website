import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: string;
    color?: string;
    sort?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
    q?: string;
  }) {
    const {
      category,
      minPrice,
      maxPrice,
      size,
      color,
      sort,
      featured,
      page = 1,
      limit = 20,
      q,
    } = query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: Prisma.ProductWhereInput = {
      isPublished: true,
    };

    if (category) {
      where.category = { slug: category };
    }

    if (featured !== undefined) {
      where.isFeatured = featured;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (size || color) {
      const some: any = {};
      if (size) some.size = size;
      if (color) some.color = color;
      where.variants = { some };
    }

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };

    if (sort) {
      switch (sort) {
        case 'newest':
          orderBy = { createdAt: 'desc' };
          break;
        case 'price-asc':
          orderBy = { price: 'asc' };
          break;
        case 'price-desc':
          orderBy = { price: 'desc' };
          break;
        case 'popular':
          orderBy = { soldCount: 'desc' };
          break;
      }
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          rating: true,
          isFeatured: true,
          images: {
            take: 1,
            select: { url: true, altText: true },
          },
          category: {
            select: { name: true, slug: true },
          },
          variants: {
            select: { size: true, color: true, stock: true },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / take),
      },
    };
  }

  async findBySlug(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: true,
        variants: true,
        category: true,
        reviews: {
          include: {
            user: {
              select: { name: true, avatar: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async create(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
