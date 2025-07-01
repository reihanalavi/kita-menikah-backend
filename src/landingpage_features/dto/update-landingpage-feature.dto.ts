import { PartialType } from '@nestjs/mapped-types';
import { CreateLandingpageFeatureDto } from './create-landingpage-feature.dto';

export class UpdateLandingpageFeatureDto extends PartialType(
  CreateLandingpageFeatureDto,
) {}
