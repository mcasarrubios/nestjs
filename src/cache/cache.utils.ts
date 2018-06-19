import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheUtils {
    
    getPath(path: string, params, placeholders = {}): string {
        Object.keys(placeholders).forEach(key => {
            const value = key.startsWith(':') ? 
                params[placeholders[key]] :
                `${key}_${params[placeholders[key]]}`;
            path = path.replace(`/${key}`, `/${value}`);
        });

        return path;
    }

    extendParams(reqParams, user) {
        let params = user ? { userId: user.id } : {};
        return Object.assign(params, reqParams);
    }
}