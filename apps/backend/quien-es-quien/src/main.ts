import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {

    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

    app.useGlobalPipes(new ValidationPipe())

    const config = new DocumentBuilder()
        .setTitle('Quién es quién')
        .setDescription('API para Quien es Quien en la prensa cubana')
        .setVersion('1.0.0')
        .setExternalDoc('API Documentation', '/documentation')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document);

    app.use(
        '/documentation',
        express.static(join(__dirname, '..', 'documentation')),
    );

    const port = Number(process.env.QEQ_PORT || 3000)

    await app.listen(port);

    console.log(`   Server listening at http://localhost:${port}}`);
}

bootstrap()
