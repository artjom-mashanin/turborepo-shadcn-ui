import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTalentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
