import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produits } from './entities/produit.entity';

/**
 * Class permettant le contrôle des données entrantes et la gestion des erreurs pour les requêtes "Users"
 * * **.create()** : Conditions préalables à l'ajout d'une nouvelle "Compétence"
 * * **.findAll()** : Conditions préalables à la récupération de toutes les "Compétences"
 * * **.findOne()** : Conditions préalables à la consultation d'une "Compétence" d'un utilisateur par son Token
 * * **.update()** : Conditions préalables à la modification d'une Compétence
 * * **.remove()**: Conditions préalables à la suppression d'une "Compétences" par un user
 */

@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Post()
  async create(
    @Body() createProduitDto: CreateProduitDto,
    @Request() req,
    @Res() res: Response,
  ) {
    const verifProd = await this.produitsService.findByNom(
      createProduitDto.nom,
    );
    console.log(verifProd);

    if (verifProd) {
      res.status(401).json({
        status: '401',
        message: 'Ce produit existe déja!!',
      });
    } else {
      await this.produitsService.create(createProduitDto);
      res.status(201).json({
        status: '201',
        message: 'Success',
        data: createProduitDto,
      });
    }
  }

  @Get()
  findAll() {
    return this.produitsService.findAll();
  }

  @Post()
  async findOneByNom(@Body('nom') nom: string) {
    const verifProd = await this.produitsService.findByNom(nom);
    if (!verifProd) {
      return {
        status: 'Erreur',
        message: `Ce produit n'existe pas !! Veuillez vérifier l'orthographe s'il vous plait.`,
      };
    }
    return this.produitsService.findByNom(nom);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const verifId = await this.produitsService.findOneById(+id);
    if (!verifId) {
      return {
        status: 'Erreur',
        message: `Cet Id de produit n'existe pas !! Veuillez verifier l'Id s'il vous plait.`,
      };
    }
    return this.produitsService.findOneById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProduitDto: UpdateProduitDto,
  ) {
    const dataCheck = await this.produitsService.findOneById(+id);
    if (!dataCheck) {
      return {
        status: 'Erreur',
        message: `Cet Id de produit n'existe pas !! Veuillez verifier l'Id s'il vous plait.`,
      };
    }
    const dataUpdate = await this.produitsService.update(+id, updateProduitDto);
    return {
      status: 'OK',
      message: `Le produit a bien été modifié !!`,
      dataUpdated: dataUpdate,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const dataCheck = await this.produitsService.findOneById(+id);
    if (!dataCheck) {
      return {
        status: 'Erreur',
        message: `Cet Id de produit n'existe pas !! Veuillez verifier l'Id s'il vous plait.`,
      };
    }
    const dataRemove = await this.produitsService.remove(+id);
    return {
      status: 'Ok',
      message: 'Le produit a bien été supprimé de vos stocks !!',
      dataRemoved: dataRemove,
    };
  }
}
