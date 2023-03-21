import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProduitDto {
  @IsOptional()
  @IsString()
  nom: string;

  @IsOptional()
  @IsNumber()
  prix: number;

  @IsOptional()
  @IsNumber()
  quantite: number;
}
