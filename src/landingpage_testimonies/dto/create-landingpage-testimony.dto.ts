import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLandingpageTestimonyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
