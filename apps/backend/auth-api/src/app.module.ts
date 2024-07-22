import { Module } from '@nestjs/common';
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { AppController } from './app.controller';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        CacheModule.register({
            ttl: 5000,
            isGlobal: true
        }),
        PrismaModule,
        UserModule,
        AuthModule
    ],
    controllers: [AppController],
})
export class AppModule {
}
