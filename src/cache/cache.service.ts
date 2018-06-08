import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheService {
    
    private _store = {};

    get(key): Observable<any> {
        return of(this._store[key]);
    }

    set(key, data): Observable<any> {
        return of(this._store[key] = data);
    }

    remove(key): Observable<any> {
        delete this._store[key];
        return of();
    }

    flush(): Observable<any> {
        this._store = {};
        return of();
    }

}