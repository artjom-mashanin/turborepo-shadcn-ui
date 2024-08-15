import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class AuthCustomerInput {
  @Field(() => String)
  token: string;
}
