import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import next from 'next';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IncomingMessage, ServerResponse } from 'http';

async function bootstrap() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = process.env.PORT || 3001;

  // Initialize Next.js app
  const nextApp = next({ dev, dir: join(__dirname, '../../client-app') });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  // Enable CORS for API routes
  app.enableCors();

  // Forward all requests to Next.js handler
  app.getHttpAdapter().get('*', (req, res) => {
    return handle(
      req as unknown as IncomingMessage,
      res as unknown as ServerResponse,
    );
  });

  console.log("Test");

  await app.listen(port);
  console.log(`✅ Server running at http://localhost:${port}`);
}

bootstrap();
