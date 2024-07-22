import { CacheInterceptor } from "@nestjs/cache-manager";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { Request } from "express";

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
    protected trackBy(context: ExecutionContext) {
        const request: Request & { user: User } = context.switchToHttp().getRequest()
        return request.user?.email
    }
}