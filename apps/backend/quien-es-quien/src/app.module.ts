import { PerfilModule } from '@/perfil/perfil.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
    // Imported Modules
    imports: [

        ConfigModule.forRoot({
            envFilePath: 'config/.env',
            isGlobal: true,
            expandVariables: true,
        }),

        //Cache
        CacheModule.register({
            isGlobal: true,
        }),

        //Schedule
        ScheduleModule.forRoot(),

        //Events
        EventEmitterModule.forRoot({
            global: true,
            wildcard: true,
        }),
        //PerfilModule,
        UsuarioModule,
        GraphqlModule
    ],

    // Providers
    providers: [
        //Cache Interceptor for all Get routes
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
    controllers: [AppController],
})
export class AppModule {
}
