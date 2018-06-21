import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
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
    let paths = [request.path];
    
    if (cacheOptions.paths && cacheOptions.paths.length > 0) {
      paths.push(...cacheOptions.paths);
    }

    const removeKeys: Observable<any> = forkJoin(paths.map(path => {
      const key = this._cacheUtils.getPath(path, params, cacheOptions.placeholders);
      return this._remove(key);
    }));
    
    removeKeys
      .pipe(map(keys => this._flatArray(keys).filter(key => key !== null)))
      .subscribe(removedKeys => console.log(`Removed ${removedKeys.length} keys`))

    return call$;
  }

  private _remove(key): Observable<any> {
    return key.indexOf('*') === -1 ? 
        this._cacheService.remove(key) :
        this._cacheService.removeStartWith(key.split('*')[0]);
  }

  private _flatArray(array) {
    return [].concat.apply([], array);
  }
}
