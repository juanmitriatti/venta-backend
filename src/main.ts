import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

// definimos la ruta
const crPath = '/etc/letsencrypt/live/api.letrix.xyz/fullchain.pem';
const pkPath = '/etc/letsencrypt/live/api.letrix.xyz/privkey.pem';
const options: any = {};

const environment = process.env.ENVIRONMENT || 'production';

if (environment != 'development') {
console.log("environment",environment)
  // validamos si los archivos existen
  if (fs.existsSync(crPath) && fs.existsSync(pkPath)) {
    // cargamos los archivos sobre las options
    options.httpsOptions = {
      cert: fs.readFileSync(crPath),
      key: fs.readFileSync(pkPath)
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
