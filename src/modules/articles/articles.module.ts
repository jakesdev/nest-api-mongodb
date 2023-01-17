import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesController } from './articles.controller';
import { ArticlesRepository } from './articles.repository';
import { ArticlesService } from './articles.service';
import { Article, ArticleSchema } from './schema/articles.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
    controllers: [ArticlesController],
    providers: [ArticlesService, ArticlesRepository],
    exports: [ArticlesService, ArticlesRepository]
})
export class ArticlesModule {}
