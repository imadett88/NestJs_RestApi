import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,  //récupérer juste les attribut qui sont les dto
    forbidNonWhitelisted:true
  }))
  await app.listen(3000);
}
bootstrap();
