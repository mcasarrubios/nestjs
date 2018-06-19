import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, forkJoin } from 'rxjs';
import { CacheService } from './cache.service';
import { CacheUtils } from './cache.utils';
import { CacheDecoratorOptions } from './cache-decorator-options.interface';

@Injectable()
export class CacheCleanerInterceptor implements NestInterceptor {
  constructor(private readonly _cacheService: CacheService,
    private readonly _cacheUtils: CacheUtils,
    private readonly _reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const params = this._cacheUtils.extendParams(request.params, request.user);
    const cacheOptions = this._reflector.get<CacheDecoratorOptions>('cacheOptions', context.getHandler()) || {};
    const paths = cacheOptions.paths && cacheOptions.paths.length > 0 ? 
      cacheOptions.paths : [request.path];
  
    const removeKeys: Observable<any> = forkJoin(paths.map(path => {
      const key = this._cacheUtils.getPath(path, params, cacheOptions.placeholders);
      return this._cacheService.remove(key);
    }));
    
    removeKeys.subscribe(removedKeys => console.log(`Removed ${removedKeys} keys`))

    return call$;
  }



}
