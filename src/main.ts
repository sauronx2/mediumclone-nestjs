if (!process.env.IS_TS_NODE) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
