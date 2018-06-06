import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppController } from './app.controller';
import { Logger } from './common/services/index';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers:[Logger]
    }).compile();
  });

  describe('root', () => {
    it('should return "Hi, welcome to our amazing API!"', () => {
      const appController = app.get<AppController>(AppController);
      const expectedData = { message: 'Hi, welcome to our amazing API!' };
      expect(appController.root()).toEqual(expectedData);
    });
  });
});
