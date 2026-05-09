import { Controller, Get, Post, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get()
  async getWishlist(@Req() req: any) {
    return this.wishlistService.getWishlist(req.user.id);
  }

  @Post(':productId')
  async addItem(@Req() req: any, @Param('productId') productId: string) {
    return this.wishlistService.addItem(req.user.id, productId);
  }

  @Delete(':productId')
  async removeItem(@Req() req: any, @Param('productId') productId: string) {
    return this.wishlistService.removeItem(req.user.id, productId);
  }
}
