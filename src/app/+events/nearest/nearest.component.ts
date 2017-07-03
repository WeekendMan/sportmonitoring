import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MonitoringService } from '../../../common/services/monitoring.service';
import { SingleEventModel } from '../../../common/models/single-event.model';
import { ConfigModel } from '../../../common/models/config.model';

@Component({
  selector: 'nearest',
  templateUrl: './nearest.component.html',
  styleUrls: [ '../common-tmp/list.css' ]
})

export class NearestComponent implements OnInit {
  public preparedMixedEvents: SingleEventModel[] = [];
  public preparedAnnouncedEvents: SingleEventModel[] = [];

  public currentEvents: SingleEventModel[];
  public announcedEvents: SingleEventModel[];
  public archiveEvents: SingleEventModel[];

  public timeNow: number;

  private config: ConfigModel;
  private sectionItemsCount: number = 2;

  constructor(private titleService: Title,
              private monitoringService: MonitoringService) {}

  public ngOnInit(): void {
    this.titleService.setTitle('Sport Monitoring | Nearest events');
    this.getConfig();
  }

  private getConfig(): void {
    this.monitoringService.getConfig().subscribe((config: ConfigModel) => {
      this.config = config;
      this.timeNow = +new Date(this.config.now);

      this.getCurrentEvents();
      this.getAnnouncement();

      setInterval(() => {
        this.getCurrentEvents();
        this.getAnnouncement();
      }, 900000);
    });
  }

  private getCurrentEvents(): void {
    this.monitoringService.getScheduleList([ 0 ]).subscribe(
      (list: SingleEventModel[]) => {
        this.currentEvents = list;
        this.preparedMixedEvents = [];
        this.prepareData(this.currentEvents, this.preparedMixedEvents);

        if (this.currentEvents.length < this.sectionItemsCount) {
          this.getArchive();
        }
      }
    );
  }

  private getAnnouncement(): void {
    this.monitoringService.getScheduleList([ 1 ]).subscribe(
      (list: SingleEventModel[]) => {
        this.announcedEvents = list;
        this.preparedAnnouncedEvents = [];
        this.prepareData(this.announcedEvents, this.preparedAnnouncedEvents);
      }
    );
  }

  private getArchive(): void {
    this.monitoringService.getScheduleList([ -1 ]).subscribe(
      (list: SingleEventModel[]) => {
        this.archiveEvents = list.reverse();
        this.prepareData(
          this.archiveEvents,
          this.preparedMixedEvents,
          this.sectionItemsCount - this.preparedMixedEvents.length
        );
      }
    );
  }

  private prepareData(from: any[], to: any[], howMany: number = this.sectionItemsCount): void {
    for (let i = 0; i < howMany && i < from.length; i++) {
      if (from[i]) {
        to.push(from[i]);
      }
    }
  }
}
