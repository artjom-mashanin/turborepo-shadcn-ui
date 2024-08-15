import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class AuthTalentInput {
  @Field(() => String)
  token: string;
}
