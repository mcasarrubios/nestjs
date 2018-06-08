import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { Logger } from '../common/services/index';
import { CacheService } from './cache.service';
import { CacheUtils } from './cache.utils';
import { CacheDecoratorOptions } from './cache-decorator-options.interface';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly _cacheService: CacheService,
    private readonly _cacheUtils: CacheUtils,
    private readonly _logger: Logger, 
    private readonly _reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const now = Date.now();
    const cacheOptions = this._reflector.get<CacheDecoratorOptions>('cacheOptions', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const path = this._cacheUtils.getPath(request, cacheOptions.userReplace);
    const key = path + this._sortQuery(request.query);
    
    return this._cacheService.get(key)
      .pipe(switchMap(data => data !== undefined ? 
        this._sendCacheRequest(data, request, now) : 
        call$.pipe(tap(data => this._cacheService.set(key, data)))
      ));
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
    this._logger.log(`[CACHED] ${request.method} ${request.path} ${Date.now() - startDate}ms`);
    return of(data);
  }
}
