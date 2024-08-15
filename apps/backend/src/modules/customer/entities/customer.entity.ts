import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Customer {
  @Field(() => String)
  id: String;

  @Field(() => String)
  email: String;

  @Field(() => String, { nullable: true })
  name?: String;
}
