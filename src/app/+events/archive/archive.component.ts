import { Component, OnInit } from '@angular/core';
import { SingleEventModel } from '../../../common/models/single-event.model';
import { Title } from '@angular/platform-browser';
import { MonitoringService } from '../../../common/services/monitoring.service';

@Component({
  selector: 'archive',
  templateUrl: './archive.component.html',
  styleUrls: [ '../common-tmp/list.css' ]
})

export class ArchiveComponent implements OnInit {
  public events: SingleEventModel[];

  constructor(private titleService: Title,
              private monitoringService: MonitoringService) {}

  public ngOnInit(): void {
    this.titleService.setTitle('Sport Monitoring | Archive');
    this.getArchive();
  }

  private getArchive(): void {
    this.monitoringService.getScheduleList([ -1 ]).subscribe(
      (list: SingleEventModel[]) => {
        this.events = list.reverse();
      }
    );
  }
}
