import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./transform.interceptor";
import { urlencoded, json } from "express";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  app.enableCors();
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
