import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateCart(userId?: string, sessionId?: string) {
    if (!userId && !sessionId) {
      throw new Error('Either userId or sessionId must be provided');
    }

    const where = userId ? { userId } : { sessionId };

    let cart = await this.prisma.cart.findUnique({
      where: where as any,
      include: {
        items: {
          include: {
            product: {
              include: { images: true },
            },
            variant: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId: userId || null,
          sessionId: sessionId || null,
        },
        include: {
          items: {
            include: {
              product: {
                include: { images: true },
              },
              variant: true,
            },
          },
        },
      });
    }

    return cart;
  }

  async addItem(userId: string | undefined, sessionId: string | undefined, productId: string, variantId: string | undefined, quantity: number) {
    const cart = await this.getOrCreateCart(userId, sessionId);

    const existingItem = cart.items.find(
      (item) => item.productId === productId && item.variantId === variantId
    );

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        variantId: variantId || null,
        quantity,
      },
    });
  }

  async updateQty(userId: string | undefined, sessionId: string | undefined, itemId: string, quantity: number) {
    const cart = await this.getOrCreateCart(userId, sessionId);

    const item = cart.items.find((i) => i.id === itemId);
    if (!item) throw new NotFoundException('Item not found in cart');

    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }

  async removeItem(userId: string | undefined, sessionId: string | undefined, itemId: string) {
    const cart = await this.getOrCreateCart(userId, sessionId);

    const item = cart.items.find((i) => i.id === itemId);
    if (!item) throw new NotFoundException('Item not found in cart');

    return this.prisma.cartItem.delete({
      where: { id: itemId },
    });
  }

  async clearCart(userId: string | undefined, sessionId: string | undefined) {
    const cart = await this.getOrCreateCart(userId, sessionId);

    return this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }

  async mergeCart(userId: string, sessionId: string) {
    const guestCart = await this.prisma.cart.findUnique({
      where: { sessionId },
      include: { items: true },
    });

    if (!guestCart || guestCart.items.length === 0) return;

    const userCart = await this.getOrCreateCart(userId);

    for (const item of guestCart.items) {
      const existingItem = userCart.items.find(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );

      if (existingItem) {
        await this.prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + item.quantity },
        });
      } else {
        await this.prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          },
        });
      }
    }

    // Delete guest cart
    await this.prisma.cart.delete({ where: { id: guestCart.id } });
  }
}
