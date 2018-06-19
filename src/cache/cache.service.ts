import { Injectable } from '@nestjs/common';
import { Observable, of, forkJoin } from 'rxjs';

@Injectable()
export class CacheService {
    
    private _store = {};

    get(key): Observable<any> {
        console.log('--GET-->', this._store);
        return of(this._store[key]);
    }

    set(key, data): Observable<any> {
        this._store[key] = data
        console.log('--SET-->', this._store);
        return of(data);
    }

    remove(key): Observable<any> {
        return key.indexOf('*') === -1 ? 
            of(delete this._store[key]) :
            this.removeStartWith(key.split('*')[0]);
    }

    removeStartWith(startStr = ''): Observable<any> {
        if (!startStr) {
          return of();
        }
    
        let tasks: Observable<any>[];
        const keys = Object.keys(this._store);
        for (const key of keys) {
          if (key.indexOf(startStr) === 0) {
            tasks.push(this.remove(key));
          }
        }

        return forkJoin(tasks);
    }

    flush(): Observable<any> {
        this._store = {};
        return of();
    }

}