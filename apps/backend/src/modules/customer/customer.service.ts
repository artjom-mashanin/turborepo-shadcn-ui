import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCustomerInput } from './dto/authCustomer.input';
import { decode } from 'jsonwebtoken';
import { PrismaService } from '~/common/providers/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '~/app/config/types';
import { KindeJwtPayload } from '~/common/providers/kinde/kinde.types';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService<AppConfig, true>,
  ) {}

  async auth(authCustomerInput: AuthCustomerInput) {
    const jwtToken = authCustomerInput.token;
    const decodedToken = decode(jwtToken) as KindeJwtPayload;

    const authId = decodedToken.sub as string;

    if (!authId) {
      throw new UnauthorizedException('Invalid token');
    }

    const customer = await this.prismaService.customer.findUnique({
      where: {
        authId,
      },
    });

    if (customer) {
      return customer;
    }

    // create a new customer
    const { email, name, picture, org_codes } = decodedToken;

    if (!email || !org_codes?.length) {
      throw new UnauthorizedException('Invalid token — no email present');
    }

    // TODO: log if there are more log codes

    const customersOrgCode = this.configService.get('KINDE_CUSTOMERS_ORG');

    if (!org_codes.includes(customersOrgCode)) {
      throw new UnauthorizedException('Invalid token — no customers org code present');
    }

    const createdCustomer = await this.prismaService.customer.create({
      data: {
        authId,
        email,
        name,
      },
    });

    return createdCustomer;
  }
}
