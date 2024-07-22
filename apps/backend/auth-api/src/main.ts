import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const config = new DocumentBuilder()
        .setTitle('CIP Auth API Doc')
        .setVersion('1.0.0')
        .setDescription('Authentication API')
        .addBearerAuth()

    const document = SwaggerModule.createDocument(app, config.build());
    SwaggerModule.setup('', app, document)

    const port = process.env.PORT || 3000

    await app.listen(port);
    console.log(`➡️ Server listening at http://localhost:${port}`)

    const check = /[a b c]/.exec('a')
}

bootstrap();
