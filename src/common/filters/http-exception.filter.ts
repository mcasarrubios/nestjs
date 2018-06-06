import { ExceptionFilter, Catch, ArgumentsHost, Inject } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { ErrorHandler } from '../services/index';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  constructor(@Inject(ErrorHandler) private _errorHandler: ErrorHandler) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message && exception.message.error,
        timestamp: new Date().toISOString(),
        path: request.url,
      });

    const _exception = Object.assign({}, exception, {
      data: {
        path: request.url,
        body: request.body
      }
    });

    this._errorHandler.handleError(_exception);
  }
}