import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
// export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
export class UpdateCustomerInput {
  @Field(() => Int)
  id: number;
}
