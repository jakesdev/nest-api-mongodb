import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Connection, Schema as MongooseSchema } from 'mongoose';

import type { PageDto } from '../../common/dto';
import { PageQueryDto, ResponseDto } from '../../common/dto';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/request/create-article.dto';
import type { ArticleDto } from './dto/response/article.dto';
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

    @Get('')
    @HttpCode(HttpStatus.OK)
    async getArticles(@Query() query: PageQueryDto): Promise<PageDto<ArticleDto>> {
        return this.articlesService.getArticles(query);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getArticleById(@Param('id') id: MongooseSchema.Types.ObjectId): Promise<ArticleDto> {
        return this.articlesService.getArticleById(id);
    }
}
