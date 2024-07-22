import { Module } from '@nestjs/common';
import { EmpleoService } from '@/empleo/empleo.service';
import { ConfigModule } from "@nestjs/config";
import { Neo4jModule, Neo4jScheme } from 'nest-neo4j/dist';

@Module({
    imports: [
        //Config
        ConfigModule.forRoot({
            envFilePath: '.env.production',
        }),

        //neo4j
        Neo4jModule.forRoot({
            scheme: <Neo4jScheme>process.env.NEO4J_SCHEME,
            host: process.env.NEO4J_HOST,
            password: process.env.NEO4J_PASSWORD,
            port: process.env.NEO4J_PORT,
            username: process.env.NEO4J_USERNAME,
            database: process.env.NEO4J_DB,
        })
    ],
    exports: [EmpleoService],
    providers: [EmpleoService]
})
export class EmpleoModule {
}
