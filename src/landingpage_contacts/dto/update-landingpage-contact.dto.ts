import { PartialType } from '@nestjs/mapped-types';
import { CreateLandingpageContactDto } from './create-landingpage-contact.dto';

export class UpdateLandingpageContactDto extends PartialType(
  CreateLandingpageContactDto,
) {}
