import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import type { Constructor } from '../types';
import type { AbstractDto } from './dto/abstract.dto';

export interface IAbstractSchema<DTO extends AbstractDto, O = never> extends Document {
    id: string;
    createdAt: Date;
    updatedAt: Date;

    toResponseDto(options?: O): DTO;
}

export abstract class AbstractSchema<DTO extends AbstractDto = AbstractDto, O = never>
    extends Document
    implements IAbstractSchema<DTO, O>
{
    @Prop({ type: () => String })
    id: string;

    @Prop({ type: Date, default: Date.now() })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now() })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now() })
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
