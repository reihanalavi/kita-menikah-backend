import { PartialType } from '@nestjs/mapped-types';
import { CreateLandingpageTestimonyDto } from './create-landingpage-testimony.dto';

export class UpdateLandingpageTestimonyDto extends PartialType(
  CreateLandingpageTestimonyDto,
) {}
