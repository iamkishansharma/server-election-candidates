import { Test, TestingModule } from '@nestjs/testing';
import { PoliticalPartiesService } from './political-parties.service';

describe('PoliticalPartiesService', () => {
  let service: PoliticalPartiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliticalPartiesService],
    }).compile();

    service = module.get<PoliticalPartiesService>(PoliticalPartiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
