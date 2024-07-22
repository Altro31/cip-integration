import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import neo4j from "neo4j-driver"
import { OGM, generate } from "@neo4j/graphql-ogm";
import * as path from "path"
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { ModelMap } from "graphql/types-generated";

@Injectable()
export class GraphqlService extends OGM<ModelMap> implements OnModuleInit {

    constructor(private readonly configService: ConfigService) {

        const scheme = configService.get("NEO4J_SCHEME");
        const host = configService.get("NEO4J_HOST");
        const port = configService.get("NEO4J_PORT");
        const username = configService.get("NEO4J_USERNAME");
        const password = configService.get("NEO4J_PASSWORD");

        const driver = neo4j.driver(
            `${scheme}://${host}:${port}`,
            neo4j.auth.basic(username, password)
        )

        const types = loadFilesSync(path.join('src/graphql/schema/**/*.graphql'))
        const typeDefs = mergeTypeDefs(types)

        super({ typeDefs, driver,features:{subscriptions: true} })
    }
    async onModuleInit() {
        await this.init()
        const ogm = this
        const outFile = "graphql/types-generated.ts";
        generate({
            ogm,
            outFile,
        })
    }
}