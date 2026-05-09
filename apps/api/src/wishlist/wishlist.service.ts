import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getWishlist(userId: string) {
    return this.prisma.wishlistItem.findMany({
      where: { userId },
      include: {
        product: {
          include: { images: true },
        },
      },
    });
  }

  async addItem(userId: string, productId: string) {
    const existing = await this.prisma.wishlistItem.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (existing) {
      throw new ConflictException('Product already in wishlist');
    }

    return this.prisma.wishlistItem.create({
      data: {
        userId,
        productId,
      },
    });
  }

  async removeItem(userId: string, productId: string) {
    const existing = await this.prisma.wishlistItem.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (!existing) {
      throw new NotFoundException('Product not found in wishlist');
    }

    return this.prisma.wishlistItem.delete({
      where: {
        userId_productId: { userId, productId },
      },
    });
  }
}
