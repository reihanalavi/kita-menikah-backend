import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLandingpageFaqDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
