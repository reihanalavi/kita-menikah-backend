import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLandingpageContactDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
