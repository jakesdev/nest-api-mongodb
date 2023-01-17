import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractSchema } from '../../../common/abstract.schema';
@Schema()
export class Article extends AbstractSchema {
    @Prop()
    title: string;

    @Prop({ index: { unique: true, dropDups: true } })
    slug: string;

    @Prop()
    description: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
