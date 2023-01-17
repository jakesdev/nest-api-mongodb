import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../../common/dto/abstract.dto';
import type { Article } from '../../schema';

export class ArticleDto extends AbstractDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    constructor(article: Article) {
        super(article);
        this.title = article.title + article.title;
        this.description = article.description;
    }
}
