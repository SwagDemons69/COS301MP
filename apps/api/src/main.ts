export * from '@mp/api/core/feature';
import { NestFactory } from '@nestjs/core';
import { CoreModule } from '../../../libs/app/core/feature/src/core.module';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  await app.listen(3000);
}
bootstrap();
