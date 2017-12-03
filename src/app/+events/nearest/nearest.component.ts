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
  public preparedTopEvents: SingleEventModel[] = [];
  public preparedBottomEvents: SingleEventModel[] = [];

  public currentEvents: SingleEventModel[];
  public announcedEvents: SingleEventModel[];
  public archiveEvents: SingleEventModel[];

  public classTopSet: string[];
  public classBottomSet: string[];

  public classNames: { current: string, announcement: string, archive: string } = {
    current: 'live',
    announcement: 'next',
    archive: 'last'
  };

  public timeNow: number;

  private config: ConfigModel;
  private sectionItemsCount: number = 2;

  private loadingStatus: { current: boolean, announcement: boolean, archive: boolean } = {
    current: false,
    announcement: false,
    archive: false
  };

  constructor(private titleService: Title,
              private monitoringService: MonitoringService) {}

  public ngOnInit(): void {
    this.titleService.setTitle('Sport Monitoring | Nearest events');
    this.getConfig();
  }

  private getEvents(): void {
    this.resetDataStatus();
    this.getCurrentEvents();
    this.getAnnouncement();
    this.getArchive();
  }

  private getConfig(): void {
    this.monitoringService.getConfig().subscribe((config: ConfigModel) => {
      this.config = config;
      this.timeNow = +new Date(this.config.now);

      this.getEvents();

      setInterval(() => {
        this.getEvents();
      }, 900000);
    });
  }

  private getCurrentEvents(): void {
    this.monitoringService.getScheduleList([ 0 ]).subscribe(
      (list: SingleEventModel[]) => {
        this.currentEvents = list;
        this.loadingStatus.current = true;
        this.checkToSetCreation();
      }
    );
  }

  private getAnnouncement(): void {
    this.monitoringService.getScheduleList([ 1 ]).subscribe(
      (list: SingleEventModel[]) => {
        this.announcedEvents = list;
        this.loadingStatus.announcement = true;
        this.checkToSetCreation();
      }
    );
  }

  private getArchive(): void {
    this.monitoringService.getScheduleList([ -1 ]).subscribe(
      (list: SingleEventModel[]) => {
        this.archiveEvents = list.reverse();
        this.loadingStatus.archive = true;
        this.checkToSetCreation();
      }
    );
  }

  private createEventsSet(): void {
    this.classTopSet = [];
    this.classBottomSet = [];

    if (this.currentEvents.length >= this.sectionItemsCount) {// If we have enough of the current events
      this.preparedTopEvents = this.currentEvents.slice(0, this.sectionItemsCount);

      this.classTopSet = new Array(this.sectionItemsCount).fill(this.classNames.current);
      this.fillPreparedEvents(
        this.preparedBottomEvents,
        [
          this.announcedEvents,
          this.archiveEvents
        ],
        [
          this.classNames.announcement,
          this.classNames.archive
        ],
        this.classBottomSet
      );

    } else {// If count of current events is not enough
      this.preparedTopEvents = [ ... this.currentEvents ];

      this.fillPreparedEvents(
        this.preparedTopEvents,
        [
          this.announcedEvents,
          this.archiveEvents
        ],
        [
          this.classNames.announcement,
          this.classNames.archive
        ],
        this.classTopSet
      );

      this.fillPreparedEvents(
        this.preparedBottomEvents,
        [ this.archiveEvents ],
        [ this.classNames.archive ],
        this.classBottomSet,
        this.preparedTopEvents
      );
    }
  }

  private fillPreparedEvents(
    arrayToFill: SingleEventModel[],
    arrayToTakeValues: Array<SingleEventModel[]>,
    classNames: string[],
    arrayToSaveClassNames: string[],
    arrayToCheck: SingleEventModel[] = [],
  ): void {
    for (
      let sourceIndex: number = 0;
      sourceIndex < arrayToTakeValues.length &&
      arrayToFill.length < this.sectionItemsCount;
      sourceIndex ++
    ) {
      let eventIndex: number = 0;

      while (
        eventIndex < arrayToTakeValues[sourceIndex].length &&
        arrayToFill.length < this.sectionItemsCount
      ) {
        if (arrayToCheck.indexOf(arrayToTakeValues[sourceIndex][eventIndex]) === -1) {
          arrayToFill.push(arrayToTakeValues[sourceIndex][eventIndex]);
          arrayToSaveClassNames.push(classNames[sourceIndex]);
        }

        eventIndex ++
      }
    }
  }

  private checkToSetCreation(): void {
    for (const key in this.loadingStatus) {
      if (!this.loadingStatus[key]) {
        return;
      }
    }

    this.createEventsSet();
  }

  private resetDataStatus(): void {
    for (const key in this.loadingStatus) {
      this.loadingStatus[key] = false;
    }
  }
}
