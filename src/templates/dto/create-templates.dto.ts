/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsInt, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  price: number;

  @IsUrl()
  previewUrl: string;
}
