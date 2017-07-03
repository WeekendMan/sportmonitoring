import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MonitoringService } from '../../common/services/monitoring.service';
import { ConfigModel } from '../../common/models/config.model';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: [ './main-page.component.css' ]
})

export class MainPageComponent {
  public eventID: number;
  public stageID: number;
  private config: ConfigModel;

  constructor(private router: Router,
              private monitoringService: MonitoringService,
              private titleService: Title) {
    this.titleService.setTitle('Sport Monitoring | Main page');
    this.getConfigEvents();
    setInterval(this.getConfigEvents.bind(this), 120000);
  }

  private getConfigEvents(): void {
    this.monitoringService
        .getConfig()
        .subscribe((config: ConfigModel) => {
          if (config.current && config.current[0]) {
            this.eventID = config.current[0].raceId;
            this.stageID = config.current[0].stageId;
          } else if (config.current.length && config.previous.raceId) {
            this.eventID = config.previous.raceId;
          } else {
            this.router.navigateByUrl('/events');
          }

          this.config = config;
        });
  }
}
