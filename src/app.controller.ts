import { Get, Controller } from '@nestjs/common';
import { Logger, ErrorHandler } from 'common/services/index';

@Controller()
export class AppController {

  constructor(private _logger: Logger, errorHandler: ErrorHandler) {
    this._logger.log('App Started');

    process.on('uncaughtException', error => {
      errorHandler.handleError(error);
      if (!errorHandler.isTrustedError(error)) {
        process.exit(1);
      }
    });

  }

  @Get()
  root(): any {
    return { message: 'Hi, welcome to our amazing API!' };
  }
}
