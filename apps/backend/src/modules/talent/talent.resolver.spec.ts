import { Test, TestingModule } from '@nestjs/testing';
import { TalentResolver } from './talent.resolver';
import { TalentService } from './talent.service';

describe('TalentResolver', () => {
  let resolver: TalentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalentResolver, TalentService],
    }).compile();

    resolver = module.get<TalentResolver>(TalentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
