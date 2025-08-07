import { Test, TestingModule } from '@nestjs/testing';
import { ZentiumApiUserController } from './presentation/zentium_api_user.controller';
import { ZentiumApiUserService } from './services/zentium_api_user.service';

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
