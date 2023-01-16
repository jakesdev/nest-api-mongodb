import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { Model } from 'mongoose';

import type { CreateArticleDto } from './dto/request/create-article.dto';
import { Articles } from './schema';

export class ArticlesRepository {
    constructor(@InjectModel(Articles.name) private readonly articlesModel: Model<Articles>) {}

    async createArticle(dto: CreateArticleDto, session: ClientSession) {
        let article = new this.articlesModel({
            name: dto.name,
            createdAt: new Date()
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
            articles = await this.articlesModel
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

    // async getArticless(query: GetQueryDto) {
    //     let from = query.from || 0;
    //     from = Number(from);

    //     let limit = query.limit || 0;
    //     limit = Number(limit);

    //     let Articless: Articles[];

    //     try {
    //         Articless = await (limit === 0
    //             ? this.ArticlesModel.find()
    //                 .populate('client')
    //                 .populate('user', 'name email')
    //                 .skip(from)
    //                 .sort({ createdAt: -1 })
    //                 .exec()
    //             : this.ArticlesModel.find()
    //                 .populate('client')
    //                 .populate('user', 'name email')
    //                 .skip(from)
    //                 .limit(limit)
    //                 .sort({ createdAt: -1 })
    //                 .exec());

    //         let response;

    //         response =
    //             Articless.length > 0
    //                 ? {
    //                     ok: true,
    //                     data: Articless,
    //                     message: 'Get Articless Ok!'
    //                 }
    //                 : {
    //                     ok: true,
    //                     data: [],
    //                     message: 'No hay Articless'
    //                 };

    //         return response;
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }
    // }

    async getArticlesById(id: MongooseSchema.Types.ObjectId) {
        let articles;

        try {
            articles = await this.articlesModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!articles) {
            throw new NotFoundException('The Articles with this id does not exist');
        }

        return articles;
    }
}
