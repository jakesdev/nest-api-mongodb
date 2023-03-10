import { StringField } from '../../../../decorators';

export class CreateArticleDto {
    @StringField()
    title: string;

    @StringField()
    description: string;
}
