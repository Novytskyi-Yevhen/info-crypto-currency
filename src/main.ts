import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = process.env.PORT || 3000;

async function start() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () =>
    console.log(`The server is running on port ${PORT}`),
  );
}
start();
