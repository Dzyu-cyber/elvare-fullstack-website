import { Controller, Get, Post, Body, Param, Req, UseGuards, Patch, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Req() req: any, @Body() dto: CreateOrderDto) {
    const userId = req.user.id;
    return this.ordersService.createOrder(userId, dto);
  }

  @Get()
  async getUserOrders(@Req() req: any) {
    const userId = req.user.id;
    return this.ordersService.getUserOrders(userId);
  }

  @Get('addresses')
  async getUserAddresses(@Req() req: any) {
    const userId = req.user.id;
    return this.ordersService.getUserAddresses(userId);
  }

  @Post('addresses')
  async createAddress(@Req() req: any, @Body() dto: any) {
    const userId = req.user.id;
    return this.ordersService.createAddress(userId, dto);
  }

  @Patch('addresses/:id')
  async updateAddress(@Req() req: any, @Param('id') id: string, @Body() dto: any) {
    const userId = req.user.id;
    return this.ordersService.updateAddress(id, userId, dto);
  }

  @Delete('addresses/:id')
  async deleteAddress(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.ordersService.deleteAddress(id, userId);
  }

  @Get(':id')
  async getOrderById(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.ordersService.getOrderById(id, userId);
  }
}
