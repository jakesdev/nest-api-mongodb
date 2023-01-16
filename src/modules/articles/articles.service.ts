import { Injectable } from '@nestjs/common';
import type { ClientSession } from 'mongoose';

import { ArticlesRepository } from './articles.repository';
import type { CreateArticleDto } from './dto/request/create-article.dto';

@Injectable()
export class ArticlesService {
    constructor(private articlesRepository: ArticlesRepository) {}

    async createArticle(dto: CreateArticleDto, session: ClientSession) {
        return this.articlesRepository.createArticle(dto, session);
    }
}
