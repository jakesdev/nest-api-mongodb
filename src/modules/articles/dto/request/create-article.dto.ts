import { StringField } from '../../../../decorators';

export class CreateArticleDto {
    @StringField()
    name: string;
}
