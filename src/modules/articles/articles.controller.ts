import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Connection } from 'mongoose';

import { ResponseDto } from '../../common/schema';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/request/create-article.dto';

@Controller('articles')
export class ArticlesController {
    constructor(
        @InjectConnection() private readonly mongoConnection: Connection,
        private articlesService: ArticlesService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({
        description: 'Create new Article'
    })
    @ApiOperation({ summary: 'Create Article' })
    async createArticle(@Body() dto: CreateArticleDto) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();

        try {
            const article = await this.articlesService.createArticle(dto, session);
            await session.commitTransaction();

            return new ResponseDto({ message: `Article [${article.title}] created successfully` });
        } catch (error) {
            await session.abortTransaction();

            throw new BadRequestException(error);
        } finally {
            await session.endSession();
        }
    }
}
