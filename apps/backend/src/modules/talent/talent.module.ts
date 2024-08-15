import { Module } from '@nestjs/common';
import { TalentService } from './talent.service';
import { TalentResolver } from './talent.resolver';
import { PrismaService } from '~/common/providers/prisma.service';

@Module({
  providers: [PrismaService, TalentResolver, TalentService],
})
export class TalentModule {}
