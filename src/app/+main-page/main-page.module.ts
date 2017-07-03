import { NgModule } from '@angular/core';
import { MonitoringService } from '../../common/services/monitoring.service';
import { SharedModule } from '../shared/shared.module';
import { MainPageComponent } from './main-page.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventModule } from '../event/event.module';

const routes: Routes = [
  { path: '', component: MainPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    EventModule
  ],
  declarations: [
    MainPageComponent
  ],
  providers: [
    MonitoringService
  ],
  exports: [ RouterModule ]
})

export class MainPageModule {}
