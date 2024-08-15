import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { AuthGuard } from '~/common/auth/auth.guard';
import { PrismaService } from '~/common/providers/prisma.service';

@Module({
  providers: [PrismaService, CustomerResolver, CustomerService],
})
export class CustomerModule {}
