import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Talent {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: String;

  @Field(() => String)
  email: String;

  @Field(() => String, { nullable: true })
  name?: String;
}
