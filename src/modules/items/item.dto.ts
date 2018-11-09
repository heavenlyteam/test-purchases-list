import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';

export class ItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}

export class UpdateItemIdo {
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}
