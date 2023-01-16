import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';

import { PageDto } from '../common/schema';
import { ResponseDto } from '../common/schema/response.dto';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const ctx = context.switchToHttp().getResponse();
        const status: number = ctx.statusCode;

        return next.handle().pipe(
            map((response) => {
                if (response instanceof ResponseDto) {
                    return {
                        status,
                        message: response.message
                    };
                }

                if (response instanceof PageDto) {
                    return {
                        status,
                        data: response.data,
                        meta: response.meta
                    };
                }

                return {
                    status,
                    data: response
                };
            })
        );
    }
}
