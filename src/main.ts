import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Hotel API')
    .setDescription('API для сайта отеля')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app,document)
  app.enableCors()
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);
  console.log(`Server started on ${PORT}`);
}
bootstrap();
