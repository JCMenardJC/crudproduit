import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm/';
import { Produits } from './produits/entities/produit.entity';
import { ProduitsModule } from './produits/produits.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'BriefsSimplon@2023',
      database: 'crudproduit',
      entities: [Produits],
      synchronize: true,
    }),
  ProduitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
