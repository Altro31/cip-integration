import { MedioModule } from "@app/medios/medio.module";
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Neo4jModule } from 'nest-neo4j/dist';
import { AppController } from './app.controller';

@Module({
    // Imported Modules
    imports: [
        //Config
        ConfigModule.forRoot({
            envFilePath: 'config/.env',
            isGlobal: true,
            expandVariables: true,
        }),

        //neo4j
        Neo4jModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                scheme: configService.get("NEO4J_SCHEME"),
                host: configService.get("NEO4J_HOST"),
                password: configService.get("NEO4J_PASSWORD"),
                port: configService.get("NEO4J_PORT"),
                username: configService.get("NEO4J_USERNAME"),
                database: configService.get("NEO4J_DB"),

            })
        }),
        MedioModule
    ],
    controllers: [AppController],
})
export class AppModule {
}
