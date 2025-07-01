import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplateModule } from './templates/templates.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { InvitationsModule } from './invitations/invitations.module';
import { UsersModule } from './users/users.module';
import { LandingpageFeaturesModule } from './landingpage_features/landingpage-features.module';
import { LandingpageContactsModule } from './landingpage_contacts/landingpage-contacts.module';
import { LandingpageTestimoniesModule } from './landingpage_testimonies/landingpage-testimonies.module';
import { LandingpageFaqsModule } from './landingpage_faqs/landingpage-faqs.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    PrismaModule,
    TemplateModule,
    OrdersModule,
    UsersModule,
    InvitationsModule,
    PaymentsModule,
    LandingpageFeaturesModule,
    LandingpageContactsModule,
    LandingpageTestimoniesModule,
    LandingpageFaqsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
