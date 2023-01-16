import { Prop } from '@nestjs/mongoose';

import type { Constructor } from '../types';
import type { AbstractDto } from './schema/abstract.schema';

export interface IAbstractSchema<DTO extends AbstractDto, O = never> {
    id: string;
    createdAt: Date;
    updatedAt: Date;

    toResponseDto(options?: O): DTO;
}

export abstract class AbstractSchema<DTO extends AbstractDto = AbstractDto, O = never>
    implements IAbstractSchema<DTO, O>
{
    @Prop({ type: () => String })
    id: string;

    @Prop({ type: () => Date })
    createdAt: Date;

    @Prop({ type: () => Date })
    updatedAt: Date;

    @Prop({ type: () => Date })
    deletedAt: Date;

    private dtoClass?: Constructor<DTO, [AbstractSchema, O?]>;

    toResponseDto(options?: O): DTO {
        const dtoClass = this.dtoClass;

        if (!dtoClass) {
            throw new Error(
                `You need to use @UseDto on class (${this.constructor.name}) be able to call toResponseDto function`
            );
        }

        return new dtoClass(this, options);
    }
}
