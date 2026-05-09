import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    // 1. Fetch user's cart
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  orderBy: { position: 'asc' },
                  take: 1,
                },
              },
            },
            variant: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // 2. Calculate totals
    let subtotal = 0;
    const itemsToCreate: {
      productId: string;
      variantId: string | null;
      quantity: number;
      price: number;
      name: string;
      imageUrl: string | null;
    }[] = [];

    for (const item of cart.items) {
      const price = Number(item.variant?.price || item.product.price);
      const amount = price * item.quantity;
      subtotal += amount;

      itemsToCreate.push({
        productId: item.productId,
        variantId: item.variantId || null,
        quantity: item.quantity,
        price: price,
        name: item.product.name,
        imageUrl: item.product.images?.[0]?.url || null,
      });
    }

    const shippingCost = 0; // Free shipping for now
    const discount = 0;
    const total = subtotal + shippingCost - discount;

    // 3. Generate order number
    const orderNumber = `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // 4. Create order and order items in a transaction
    try {
      return await this.prisma.$transaction(async (tx) => {
        let addressId = dto.addressId;

        if (!addressId) {
          if (!dto.name || !dto.line1 || !dto.city || !dto.state || !dto.pincode || !dto.phone) {
            throw new BadRequestException('Address details are incomplete');
          }

          const address = await tx.address.create({
            data: {
              userId,
              name: dto.name,
              line1: dto.line1,
              line2: dto.line2,
              city: dto.city,
              state: dto.state,
              pincode: dto.pincode,
              country: dto.country || 'India',
              phone: dto.phone,
            },
          });
          addressId = address.id;
        }

        // Create order
        const order = await tx.order.create({
          data: {
            orderNumber,
            userId,
            addressId: addressId,
            subtotal,
            shippingCost,
            discount,
            total,
            status: OrderStatus.CONFIRMED,
            paymentStatus: PaymentStatus.PAID,
            paymentMethod: dto.paymentMethod,
            paymentId: dto.paymentId,
            notes: dto.notes,
            items: {
              create: itemsToCreate,
            },
          },
        });

        // Reduce stock
        for (const item of cart.items) {
          if (item.variantId) {
            await tx.productVariant.update({
              where: { id: item.variantId },
              data: {
                stock: {
                  decrement: item.quantity,
                },
              },
            });
          }
          
          await tx.product.update({
            where: { id: item.productId },
            data: {
              totalStock: {
                decrement: item.quantity,
              },
              soldCount: {
                increment: item.quantity,
              },
            },
          });
        }

        // Clear cart
        await tx.cartItem.deleteMany({
          where: { cartId: cart.id },
        });

        return order;
      });
    } catch (error) {
      throw new BadRequestException('Failed to create order: ' + error.message);
    }
  }

  async getUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
      },
    });
  }

  async getOrderById(id: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        address: true,
      },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    if (order.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    return order;
  }

  async getUserAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
    });
  }

  async createAddress(userId: string, data: any) {
    return this.prisma.address.create({
      data: { ...data, userId },
    });
  }

  async updateAddress(id: string, userId: string, data: any) {
    const address = await this.prisma.address.findUnique({ where: { id } });
    if (!address || address.userId !== userId) {
      throw new BadRequestException('Address not found or access denied');
    }
    return this.prisma.address.update({
      where: { id },
      data,
    });
  }

  async deleteAddress(id: string, userId: string) {
    const address = await this.prisma.address.findUnique({ where: { id } });
    if (!address || address.userId !== userId) {
      throw new BadRequestException('Address not found or access denied');
    }
    return this.prisma.address.delete({ where: { id } });
  }
}
