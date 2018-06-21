import { Injectable } from '@nestjs/common';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CacheService {
    
    private _store = {};

    get(key): Observable<any> {
        return of(this._store[key]);
    }

    set(key, data): Observable<any> {
        this._store[key] = data
        return of(data);
    }

    remove(key): Observable<any> {
        const removedKey: string = this._store[key] != null ? key : null;
        delete this._store[key];
        return of(removedKey);
    }

    removeStartWith(startStr = ''): Observable<any> {
        if (!startStr) {
          return of();
        }

        let tasks: Observable<any>[] = [];
        for (const key of Object.keys(this._store)) {
          if (key.indexOf(startStr) === 0) {
            tasks.push(this.remove(key));
          }
        }

        return tasks.length > 0 ? forkJoin(tasks) : of([]);
    }

    flush(): Observable<any> {
        this._store = {};
        return of();
    }

}