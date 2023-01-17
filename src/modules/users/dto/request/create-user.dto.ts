import { StringField } from '../../../../decorators';

export class CreateArticleDto {
    @StringField()
    email: string;

    @StringField()
    password: string;
}
