import { Module } from '@nestjs/common';
import { LandingpageContactsService } from './landingpage-contacts.service';
import { LandingpageContactsController } from './landingpage-contacts.controller';

@Module({
  controllers: [LandingpageContactsController],
  providers: [LandingpageContactsService],
})
export class LandingpageContactsModule {}
