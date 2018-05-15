import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root(): string {
    return 'Hi, welcome to our amazing API!';
  }
}
