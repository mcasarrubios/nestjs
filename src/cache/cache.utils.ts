import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheUtils {
    
    getPath(request: any, userReplace): string {
        return request.user && userReplace ? 
            request.path.replace(userReplace, `${userReplace}_${request.user.id}`) :
            request.path;
    }

}