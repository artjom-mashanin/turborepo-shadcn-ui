import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppConfig } from './config/types';
import { AuthModule } from '~/common/auth/auth.module';
// import { CommonModule } from 'src/common/common.module';
import { CommonModule } from '../common/common.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object<AppConfig>({
        PORT: Joi.number().default(3000),
        ADART_WEBAPP_URL: Joi.string().required(),
        ADART_API_URL: Joi.string().required(),
        ADART_GRAPHQL_URL: Joi.string().required(),
        ADART_DB_URL: Joi.string().required(),
        ADART_DB_DIRECT_URL: Joi.string().required(),
        KINDE_DOMAIN: Joi.string().required(),
        KINDE_CUSTOMERS_ORG: Joi.string().required(),
        KINDE_TALENTS_ORG: Joi.string().required(),
      }),
    }),
    CommonModule,
    AuthModule,
  ],
  providers: [Logger],
  exports: [Logger],
})
export class GlobalModule {}
