import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesController } from './articles.controller';
import { ArticlesRepository } from './articles.repository';
import { ArticlesService } from './articles.service';
import { Articles, articleSchema } from './schema/articles.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Articles.name, schema: articleSchema }])],
    controllers: [ArticlesController],
    providers: [ArticlesService, ArticlesRepository],
    exports: [ArticlesService, ArticlesRepository]
})
export class ArticlesModule {}
