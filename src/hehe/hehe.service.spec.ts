import { Test, TestingModule } from '@nestjs/testing';
import { HeheService } from './hehe.service';

describe('HeheService', () => {
  let service: HeheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeheService],
    }).compile();

    service = module.get<HeheService>(HeheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
