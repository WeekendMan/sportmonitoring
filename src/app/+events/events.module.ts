import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EventModule } from '../event/event.module';

import { MonitoringService } from '../../common/services/monitoring.service';
import { ROUTES } from './events.routes';

import { SingleEventComponent } from './single-event/single-event.component';
import { NearestComponent } from './nearest/nearest.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { ArchiveComponent } from './archive/archive.component';

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    SharedModule,
    EventModule
  ],
  declarations: [
    NearestComponent,
    AnnouncementComponent,
    ArchiveComponent,
    SingleEventComponent
  ],
  providers: [
    MonitoringService
  ],
  exports: [ RouterModule ]
})

export class EventsModule {}
