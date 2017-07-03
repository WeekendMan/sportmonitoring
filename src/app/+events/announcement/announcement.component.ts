import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SingleEventModel } from '../../../common/models/single-event.model';
import { MonitoringService } from '../../../common/services/monitoring.service';

@Component({
  selector: 'announcement',
  templateUrl: './announcement.component.html',
  styleUrls: [ '../common-tmp/list.css' ]
})

export class AnnouncementComponent implements OnInit {
  public events: SingleEventModel[];

  constructor(private titleService: Title,
              private monitoringService: MonitoringService) {}

  public ngOnInit(): void {
    this.titleService.setTitle('Sport Monitoring | Announcement');
    this.getAnnouncement();
  }

  private getAnnouncement(): void {
    this.monitoringService.getScheduleList([ 1 ]).subscribe(
      (list: SingleEventModel[]) => {
        this.events = list;
      }
    );
  }
}
