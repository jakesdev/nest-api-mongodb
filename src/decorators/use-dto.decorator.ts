import type { AbstractSchema } from '../common/abstract.schema';
import type { AbstractDto } from '../common/dto/abstract.dto';
import type { Constructor } from '../types';

export function UseDto(dtoClass: Constructor<AbstractDto, [AbstractSchema, unknown]>): ClassDecorator {
    return (ctor) => {
        ctor.prototype.dtoClass = dtoClass;
    };
}
