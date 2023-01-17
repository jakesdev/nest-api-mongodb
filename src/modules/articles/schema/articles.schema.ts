import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractSchema } from '../../../common/abstract.schema';
import { UseDto } from '../../../decorators';
import { ArticleDto } from '../dto/response/article.dto';
@Schema()
@UseDto(ArticleDto)
export class Article extends AbstractSchema<ArticleDto> {
    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    slug: string;

    @Prop({ type: String })
    description: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
