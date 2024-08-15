import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TalentService } from './talent.service';
import { Talent } from './entities/talent.entity';
import { CreateTalentInput } from './dto/createTalent.input';
import { UpdateTalentInput } from './dto/updateTalent.input';
import { AuthTalentInput } from './dto/authTalent.input';

@Resolver(() => Talent)
export class TalentResolver {
  constructor(private readonly talentService: TalentService) {}

  @Mutation(() => Talent)
  authTalent(@Args('input') authTalentInput: AuthTalentInput) {
    return this.talentService.auth(authTalentInput);
  }

  // @Mutation(() => Talent)
  // createTalent(@Args('createTalentInput') createTalentInput: CreateTalentInput) {
  //   return this.talentService.create(createTalentInput);
  // }

  @Query(() => [Talent], { name: 'talent' })
  findAll() {
    return this.talentService.findAll();
  }

  // @Query(() => Talent, { name: 'talent' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.talentService.findOne(id);
  // }

  // @Mutation(() => Talent)
  // updateTalent(@Args('updateTalentInput') updateTalentInput: UpdateTalentInput) {
  //   return this.talentService.update(updateTalentInput.id, updateTalentInput);
  // }

  // @Mutation(() => Talent)
  // removeTalent(@Args('id', { type: () => Int }) id: number) {
  //   return this.talentService.remove(id);
  // }
}
