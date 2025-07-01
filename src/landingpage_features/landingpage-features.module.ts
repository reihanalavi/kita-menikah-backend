import { Module } from '@nestjs/common';
import { LandingpageFeaturesService } from './landingpage-features.service';
import { LandingpageFeaturesController } from './landingpage-features.controller';

@Module({
  controllers: [LandingpageFeaturesController],
  providers: [LandingpageFeaturesService],
})
export class LandingpageFeaturesModule {}
