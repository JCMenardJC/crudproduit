import { Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produits } from './entities/produit.entity';

/**
 * Class permettant la gestion des requêtes SQL pour les "produits"
 * * **.create()** :ajoute de nouveaux "produits" à la BDD
 * * **.findAll()** : recupère touts les "produits" dans la BDD
 * * **.findByNom()** : recupère un "produit" par son nom
 * * **.findOneById()**:recupère un "produit" par son ID
 * * **.update()** : modifie les donnees d'un ou des "produits" avec son ID
 * * **.remove()** : supprime les donnees d'un "produits"
 */

@Injectable()
export class ProduitsService {
  async create(createProduitDto: CreateProduitDto) {
    const newProduits = new Produits();
    newProduits.nom = createProduitDto.nom;
    newProduits.prix = createProduitDto.prix;
    newProduits.quantite = createProduitDto.quantite;
    await newProduits.save();
    return newProduits;
  }

  async findAll() {
    const allProduits = await Produits.find();
    return allProduits;
  }

  async findByNom(nom: string) {
    const findProduit = await Produits.findOneBy({
      nom: nom,
    });
    return findProduit;
  }

  async findOneById(id: number) {
    const findProduit = await Produits.findOneBy({
      id: id,
    });
    return findProduit;
  }

  async update(id: number, updateProduitDto: UpdateProduitDto) {
    const data = await Produits.findOneBy({ id: id });

    await Produits.update(data.id, updateProduitDto);

    const dataUpdated = await Produits.findOneBy({ id: id });
    if (dataUpdated) {
      return dataUpdated;
    }
    return undefined;
  }

  async remove(id: number) {
    const idProduit = await Produits.findOneBy({ id: id });
    if (!idProduit) {
      return `Ce produit n'existe pas !Vérifier l'Id SVP`;
    }
    await Produits.remove(idProduit);
    return idProduit;
  }
}
