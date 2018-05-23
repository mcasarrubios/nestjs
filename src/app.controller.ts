import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root(): any {
    return { message:'Hi, welcome to our amazing API!'};
  }
}
