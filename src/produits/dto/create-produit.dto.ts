import {
  IsNotEmpty,
  IsString,
  IsNumber
} from 'class-validator'

export class CreateProduitDto {
    @IsNotEmpty()
    @IsString()
    nom:string;

    @IsNotEmpty()
    @IsNumber()
    prix:number;
    
    @IsNotEmpty()
    @IsNumber()
    quantite:number

}
