import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { GlobalModule } from './global.module';
import { CustomerModule } from '~/modules/customer/customer.module';
import { TalentModule } from '~/modules/talent/talent.module';

@Module({
  imports: [
    GlobalModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // TODO: remove playground in production
      playground: true,
      autoSchemaFile: true,
    }),
    CustomerModule,
    TalentModule,
  ],
})
export class AppModule {}
