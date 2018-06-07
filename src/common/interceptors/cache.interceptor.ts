import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { CacheService, Logger } from '../services/index';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly _cacheService: CacheService,
    private readonly _logger: Logger, 
    private readonly _reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const now = Date.now();
    const userReplace = this._reflector.get<string[]>('userReplace', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const path = this._getPath(request, userReplace);
    const key = path + this._sortQuery(request.query);

    console.log('--->', key);
    
    return this._cacheService.get(key)
      .pipe(switchMap(data => data !== undefined ? 
        this._sendCacheRequest(data, request, now) : 
        call$.pipe(tap(data => this._cacheService.set(key, data)))
      ));
  }

  private _getPath(request, userReplace): string {
    return request.user && userReplace ? 
      request.path.replace(userReplace, `${userReplace}_${request.user.id}`) :
      request.path;
  }

  private _sortQuery(query): string {
    const keys = Object.keys(query).sort((a,b)=> {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0
    });

    return keys.length === 0 ? '' : '?'+ keys.map(key => `${key}=${query[key]}`).join('&');
  }

  private _sendCacheRequest(data, request, startDate): Observable<any> {
    this._logger.log(`${request.method} [CACHED] ${request.path} ${Date.now() - startDate}ms`);
    return of(data);
  }
}
