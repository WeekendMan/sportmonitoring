import { Routes } from '@angular/router';
import { SingleEventComponent } from './single-event/single-event.component';
import { ArchiveComponent } from './archive/archive.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { NearestComponent } from './nearest/nearest.component';

export const ROUTES: Routes = [
  { path: '', component: NearestComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'announcement', component: AnnouncementComponent },
  { path: ':eventID', component: SingleEventComponent },
  { path: ':eventID/:stageID', component: SingleEventComponent }
];
