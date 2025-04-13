import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, SwaggerDocumentOptions } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  if (configService.get<string>('NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('App API')
      .setDescription('Documentação da API do SpotiCraft')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const options: SwaggerDocumentOptions = {
      deepScanRoutes: true,
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api', app, document);
  }
}

function setupCors(app: INestApplication) {
  const whitelist = [
    'http://localhost:3000',
  ];

  app.enableCors({
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization, Access-Control-Allow-Origin',
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(`${origin} not allowed by CORS`));
      }
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  process.env.TZ = 'America/Sao_Paulo'; 
  
  setupSwagger(app);
  setupCors(app);

  await app.listen(3000);
}

bootstrap();