import { ExceptionFilter, Catch, ArgumentsHost, Injectable } from '@nestjs/common';
import { ErrorHandler } from '../services/index';

@Injectable()
@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  
  constructor(private _errorHandler: ErrorHandler) {}
  
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response
      .status(500)
      .json({
        statusCode: 500,
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
        path: request.url,
      });

    exception.data = Object.assign({}, exception.data, {
      path: request.url,
      body: request.body
    });

    this._errorHandler.handleError(exception);
    if (!this._errorHandler.isTrustedError(exception)) {
      process.exit(1);
    }
  }
}
