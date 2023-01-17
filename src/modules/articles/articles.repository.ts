import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';

import type { PageQueryDto } from '../../common/dto';
import type { CreateArticleDto } from './dto/request/create-article.dto';
import { Article } from './schema';

export class ArticlesRepository {
    constructor(@InjectModel(Article.name) private readonly articleModel: Model<Article>) {}

    async createArticle(dto: CreateArticleDto, session: ClientSession) {
        let article = new this.articleModel({
            title: dto.title,
            description: dto.description,
            slug: slugify(dto.title, { lower: true, strict: true }) // TODO: to slug
        });

        try {
            article = await article.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return article;
    }

    async updateArticle(id: string, session: ClientSession) {
        const updateData = {
            name: 'thuan updated',
            updatedAt: new Date()
        };

        let articles;

        try {
            articles = await this.articleModel
                .findOneAndUpdate({ _id: id }, updateData, {
                    new: true
                })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!articles) {
            throw new ConflictException('Error trying to update Articles');
        }

        return articles;
    }

    async getArticles(query: PageQueryDto): Promise<[Article[], number]> {
        let articles: Article[];

        try {
            const itemCount = await this.articleModel.count();
            articles = await this.articleModel
                .find()
                .skip(query.skip)
                .limit(query.limit)
                .sort({ createdAt: query.order })
                .exec();

            return [articles, itemCount];
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getArticlesById(id: MongooseSchema.Types.ObjectId) {
        let articles;

        try {
            articles = await this.articleModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!articles) {
            throw new NotFoundException();
        }

        return articles;
    }
}
