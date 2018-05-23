import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '../services/index';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  constructor(private _logger: Logger) {}

  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    return call$.pipe(tap(() => this._logger.log(`${request.method} ${request.path} ${Date.now() - now}ms`)));
  }
}
