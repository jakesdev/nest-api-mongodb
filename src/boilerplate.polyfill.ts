/* eslint-disable @typescript-eslint/naming-convention,sonarjs/cognitive-complexity */
import 'source-map-support/register';

import { compact, map } from 'lodash';

import type { AbstractSchema } from './common/abstract.schema';
import type { AbstractDto } from './common/schema/abstract.schema';
import { PageDto } from './common/schema/page.dto';
import type { PageMetaDto } from './common/schema/page-meta.dto';
declare global {
    export type Uuid = string & { _uuidBrand: undefined };

    interface Array<T> {
        toResponseDtos<Dto extends AbstractDto>(this: T[], options?: unknown): Dto[];

        toPageResponseDto<Dto extends AbstractDto>(
            this: T[],
            pageMetaDto: PageMetaDto,
            // FIXME make option type visible from entity
            options?: unknown
        ): PageDto<Dto>;
    }
}

Array.prototype.toResponseDtos = function <Entity extends AbstractSchema<Dto>, Dto extends AbstractDto>(
    options?: unknown
): Dto[] {
    return compact(map<Entity, Dto>(this as Entity[], (item) => item.toResponseDto(options as never)));
};

Array.prototype.toPageResponseDto = function (pageMetaDto: PageMetaDto, options?: unknown) {
    return new PageDto(this.toResponseDtos(options), pageMetaDto);
};
