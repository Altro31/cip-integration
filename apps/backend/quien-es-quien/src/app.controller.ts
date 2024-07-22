import { Controller, Get } from "@nestjs/common";
import { GraphqlService } from "./graphql/graphql.service";

@Controller()
export class AppController {

    constructor(
        private readonly graphqlService: GraphqlService
    ) { }

    @Get('healthcheck')
    healthcheck() {
        return null
    }
}