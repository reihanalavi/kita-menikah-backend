// src/payment/dto/create-payment.dto.ts
import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  orderId: string;

  @IsNumber()
  amount: number;

  @IsString()
  status: string; // e.g. 'pending', 'completed', 'failed'

  @IsString()
  method: string; // e.g. 'credit_card', 'bank_transfer'

  @IsDateString()
  @IsOptional()
  paidAt?: string;
}
