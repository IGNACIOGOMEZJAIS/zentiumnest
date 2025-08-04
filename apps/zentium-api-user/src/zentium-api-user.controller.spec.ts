import { Test, TestingModule } from '@nestjs/testing';
import { ZentiumApiUserController } from './presentation/zentium-api-user.controller';
import { ZentiumApiUserService } from './services/zentium-api-user.service';

describe('ZentiumApiUserController', () => {
  let zentiumApiUserController: ZentiumApiUserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ZentiumApiUserController],
      providers: [ZentiumApiUserService],
    }).compile();

    zentiumApiUserController = app.get<ZentiumApiUserController>(ZentiumApiUserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(zentiumApiUserController.getHello()).toBe('Hello World!');
    });
  });
});
