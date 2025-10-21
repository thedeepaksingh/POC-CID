import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import nextJs from 'next';

async function bootstrap() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3001;

  // Init Next.js
  const nextApp = nextJs({ dev, dir: join(__dirname, '../../client-app') });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  app.enableCors();

  // ✅ FIXED: Use default handler without '*'
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.path.startsWith('/api')) {
      return next(); // Let NestJS handle it
    }
    return handle(req, res);
  });

  await app.listen(port);
  console.log(`✅ Server running at http://localhost:${port}`);
}
bootstrap();
