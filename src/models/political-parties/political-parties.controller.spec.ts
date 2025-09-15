import { Test, TestingModule } from '@nestjs/testing';
import { PoliticalPartiesController } from './political-parties.controller';
import { PoliticalPartiesService } from './political-parties.service';

describe('PoliticalPartiesController', () => {
  let controller: PoliticalPartiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliticalPartiesController],
      providers: [PoliticalPartiesService],
    }).compile();

    controller = module.get<PoliticalPartiesController>(PoliticalPartiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
