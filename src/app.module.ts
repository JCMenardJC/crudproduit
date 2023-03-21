import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm/';
import { Produits } from './produits/entities/produit.entity';
import { ProduitsModule } from './produits/produits.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Produits],
      synchronize: true,
    }),
    ProduitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
