import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
      .setTitle("Test task documentation")
      .setDescription("Документация по тестовому заданию")
      .setVersion("1.0")
      .addTag("test_task")
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/docs", app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
