import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTalentInput } from './dto/createTalent.input';
import { UpdateTalentInput } from './dto/updateTalent.input';
import { AuthTalentInput } from './dto/authTalent.input';
import { PrismaService } from '~/common/providers/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '~/app/config/types';
import { KindeJwtPayload } from '~/common/providers/kinde/kinde.types';
import { decode } from 'jsonwebtoken';
import { Talent } from './entities/talent.entity';

@Injectable()
export class TalentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService<AppConfig, true>,
  ) {}

  async auth(authTalentInput: AuthTalentInput): Promise<Talent> {
    const jwtToken = authTalentInput.token;
    const decodedToken = decode(jwtToken) as KindeJwtPayload;

    const authId = decodedToken.sub as string;

    if (!authId) {
      throw new UnauthorizedException('Invalid token');
    }

    const talent = await this.prismaService.talent.findUnique({
      where: {
        authId,
      },
    });

    if (talent) {
      return talent;
    }

    // create a new talent
    const { email, name, picture, org_codes } = decodedToken;

    if (!email || !org_codes?.length) {
      throw new UnauthorizedException('Invalid token — no email present');
    }

    // TODO: add logging

    const talentsOrgCode = this.configService.get('KINDE_TALENTS_ORG');

    if (!org_codes.includes(talentsOrgCode)) {
      throw new UnauthorizedException('Invalid token — no talents org code present');
    }

    const createdTalent = await this.prismaService.talent.create({
      data: {
        authId,
        email,
        name,
      },
    });

    return createdTalent;
  }

  create(createTalentInput: CreateTalentInput) {
    return 'This action adds a new talent';
  }

  findAll() {
    return `This action returns all talent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} talent`;
  }

  update(id: number, updateTalentInput: UpdateTalentInput) {
    return `This action updates a #${id} talent`;
  }

  remove(id: number) {
    return `This action removes a #${id} talent`;
  }
}
