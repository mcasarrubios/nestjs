import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
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
    const cacheOptions = this._reflector.get<CacheDecoratorOptions>('cacheOptions', context.getHandler());
    const paths = cacheOptions.paths && cacheOptions.paths.length > 0 ? 
      cacheOptions.paths : [request.path];
    
    paths.forEach(path => {
      const _request = {
        path: path,
        user: request.user
      };

      const key = this._cacheUtils.getPath(_request, cacheOptions.userReplace);
      this._cacheService.remove(key);
    })
    
    return call$;
  }

  private _getPath(request, userReplace): string {
    return request.user && userReplace ? 
      request.path.replace(userReplace, `${userReplace}_${request.user.id}`) :
      request.path;
  }
}
