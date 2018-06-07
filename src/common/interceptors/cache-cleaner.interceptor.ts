import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { CacheService, Logger } from '../services/index';

@Injectable()
export class CacheCleanerInterceptor implements NestInterceptor {
  constructor(private readonly _cacheService: CacheService,
    private readonly _reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const paths = this._reflector.get<string[]>('cachePaths', context.getHandler());
    const request = context.switchToHttp().getRequest();

    console.log('--AAAAA--', paths);

    return call$;
  }

  private _mapPath(pathElements, reqPathElements) {
    pathElements
      .map((ele: string, i: number) => ele.startsWith(':') ? reqPathElements[i]: ele)
      .join('/');
  }
}
