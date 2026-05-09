import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('razorpay/create')
  async createRazorpayOrder(@Body() body: { amount: number; currency?: string }) {
    return this.paymentsService.createRazorpayOrder(body.amount, body.currency);
  }
}
