import { Get, Controller, ExceptionFilter } from '@nestjs/common';
import { Logger } from './common/services/index';

@Controller()
export class AppController {

  constructor(private _logger: Logger) {
    this._logger.log('App Started');
  }

  @Get()
  root(): any {
    return { message: 'Hi, welcome to our amazing API!' };
  }
}
