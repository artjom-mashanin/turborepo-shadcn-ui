import { CreateTalentInput } from './createTalent.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTalentInput extends PartialType(CreateTalentInput) {
  @Field(() => Int)
  id: number;
}
