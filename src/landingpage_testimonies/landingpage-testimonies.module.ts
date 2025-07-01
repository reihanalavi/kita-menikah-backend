import { Module } from '@nestjs/common';
import { LandingpageTestimoniesService } from './landingpage-testimonies.service';
import { LandingpageTestimoniesController } from './landingpage-testimonies.controller';

@Module({
  controllers: [LandingpageTestimoniesController],
  providers: [LandingpageTestimoniesService],
})
export class LandingpageTestimoniesModule {}
