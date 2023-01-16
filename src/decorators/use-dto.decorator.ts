import type { AbstractSchema } from '../common/abstract.schema';
import type { AbstractDto } from '../common/schema/abstract.schema';
import type { Constructor } from '../types';

export function UseDto(dtoClass: Constructor<AbstractDto, [AbstractSchema, unknown]>): ClassDecorator {
    return (ctor) => {
        ctor.prototype.dtoClass = dtoClass;
    };
}
