import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()

export class Produits extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar'})
    nom:string;

    @Column({type:'integer'})
    prix:number;
    @Column({type:'integer'})
    quantite:number
}