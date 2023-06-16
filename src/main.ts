import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  try {
    const app = await NestFactory.create(AppModule, {cors:true});
    const PORT = process.env.PORT || 3000;
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    app.use((req, res, next)=>{
        const startTime = Date.now();
        const start = new Date(startTime)
        res.on('finish', ()=>{
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            console.log(`${req.method}; ${req.originalUrl}; ${res.statusCode}; ${responseTime}ms; at:${start.toString()}`);
        });
        next();
    })

    const config = new DocumentBuilder()
            .addBearerAuth()
            .setTitle('Medium Lite')
            .setDescription('REST API')
            .setVersion('1.0.0')
            .addTag('NodeJS, NestJS, Postgres, sequlize')
            .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    await app.listen(PORT, ()=>{
      console.log(`server running on port: ${PORT}`);
      
    });
  } catch (error) {
      console.log(error);
  } 
  
}
start();

