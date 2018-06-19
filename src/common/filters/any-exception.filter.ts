import { 
  ExceptionFilter, Catch, 
  ArgumentsHost, Injectable, 
  HttpException, InternalServerErrorException,
  ServiceUnavailableException
} from '@nestjs/common';
import { ErrorHandler } from '../services/index';

@Injectable()
@Catch()
export class AnyExceptionFilter implements ExceptionFilter {

  constructor(private _errorHandler: ErrorHandler) {}
  
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const _exception = this._getException(exception);
    exception.isOperational = this._isOperational(_exception);

    const serverError =  !exception.isOperational ? 
      new InternalServerErrorException():
      _exception;

    response
      .status(serverError.getStatus())
      .json({
        timestamp: new Date().toISOString(),
        path: request.url,
        message: serverError.message.error || serverError.message,
        statusCode: serverError.status,
        response: serverError.getResponse()
      });

    exception.data = Object.assign({}, exception.data, {
      path: request.url,
      body: request.body,
      method: request.method
    });

    this._errorHandler.handleError(exception);
  }

  private _isOperational(exception) {
    return exception instanceof HttpException;
  }

  private _getException(exception) {
    if (exception.code === 'ECONNREFUSED') return new ServiceUnavailableException();
    return exception;

  }
}
