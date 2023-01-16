import './boilerplate.polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { ArticlesModule } from './modules/articles/articles.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        MongooseModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ApiConfigService) => configService.getMongooseOptions(),
            inject: [ApiConfigService]
        }),
        ArticlesModule,
        ScheduleModule.forRoot()
    ],
    providers: []
})
export class AppModule {}
