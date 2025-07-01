import { PartialType } from '@nestjs/mapped-types';
import { CreateLandingpageFaqDto } from './create-landingpage-faq.dto';

export class UpdateLandingpageFaqDto extends PartialType(
  CreateLandingpageFaqDto,
) {}
