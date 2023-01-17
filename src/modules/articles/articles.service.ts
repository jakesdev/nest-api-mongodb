import { Injectable } from '@nestjs/common';
import type { ClientSession, Schema as MongooseSchema } from 'mongoose';

import type { PageQueryDto } from '../../common/dto';
import { PageDto, PageMetaDto } from '../../common/dto';
import { ArticlesRepository } from './articles.repository';
import type { CreateArticleDto } from './dto/request/create-article.dto';
import { ArticleDto } from './dto/response/article.dto';
import type { Article } from './schema';

@Injectable()
export class ArticlesService {
    constructor(private articlesRepository: ArticlesRepository) {}

    async createArticle(dto: CreateArticleDto, session: ClientSession) {
        return this.articlesRepository.createArticle(dto, session);
    }

    async getArticles(query: PageQueryDto) {
        const [data, itemCount] = await this.articlesRepository.getArticles(query);
        // TODO: mapping data response
        const meta = new PageMetaDto({ query, itemCount });

        return new PageDto(data, meta);
    }

    async getArticleById(id: MongooseSchema.Types.ObjectId) {
        const article: Article = await this.articlesRepository.getArticlesById(id);

        return new ArticleDto(article);
    }
}
