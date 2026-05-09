import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  private getSessionId(req: Request): string | undefined {
    const cookies = req.headers.cookie;
    return cookies?.split(';').find(c => c.trim().startsWith('sessionId='))?.split('=')[1];
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  async getCart(@Req() req: any) {
    const userId = req.user?.id;
    const sessionId = this.getSessionId(req);
    return this.cartService.getOrCreateCart(userId, sessionId);
  }

  @Post('items')
  @UseGuards(OptionalJwtAuthGuard)
  async addItem(@Req() req: any, @Body() body: { productId: string; variantId?: string; quantity: number }) {
    const userId = req.user?.id;
    const sessionId = this.getSessionId(req);
    return this.cartService.addItem(userId, sessionId, body.productId, body.variantId, body.quantity);
  }

  @Patch('items/:id')
  @UseGuards(OptionalJwtAuthGuard)
  async updateQty(@Req() req: any, @Param('id') id: string, @Body() body: { quantity: number }) {
    const userId = req.user?.id;
    const sessionId = this.getSessionId(req);
    return this.cartService.updateQty(userId, sessionId, id, body.quantity);
  }

  @Delete('items/:id')
  @UseGuards(OptionalJwtAuthGuard)
  async removeItem(@Req() req: any, @Param('id') id: string) {
    const userId = req.user?.id;
    const sessionId = this.getSessionId(req);
    return this.cartService.removeItem(userId, sessionId, id);
  }

  @Delete('clear')
  @UseGuards(OptionalJwtAuthGuard)
  async clearCart(@Req() req: any) {
    const userId = req.user?.id;
    const sessionId = this.getSessionId(req);
    return this.cartService.clearCart(userId, sessionId);
  }

  @Post('merge')
  @UseGuards(OptionalJwtAuthGuard)
  async mergeCart(@Req() req: any, @Body() body: { sessionId: string }) {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedException('User must be logged in to merge cart');
    return this.cartService.mergeCart(userId, body.sessionId);
  }
}
