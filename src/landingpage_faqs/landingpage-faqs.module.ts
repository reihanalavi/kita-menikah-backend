import { Module } from '@nestjs/common';
import { LandingpageFaqsService } from './landingpage-faqs.service';
import { LandingpageFaqsController } from './landingpage-faqs.controller';

@Module({
  controllers: [LandingpageFaqsController],
  providers: [LandingpageFaqsService],
})
export class LandingpageFaqsModule {}
