import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonitoringService } from '../../common/services/monitoring.service';

import { SingleEventModel } from '../../common/models/single-event.model';
import { TweetModel } from '../../common/models/tweet.model';
import { TweetsModel } from '../../common/models/tweets.model';
import { ConfigModel } from '../../common/models/config.model';
import { MostPopularPersonModel } from '../../common/models/most-popular-person.model';
import { MostPopularPersonsModel } from '../../common/models/most-popular-persons.model';
import { StagesModel } from '../../common/models/stages.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: [ './event.component.css' ]
})

export class EventComponent implements OnInit {
  public eventID: number;
  public stageID: number;
  public eventInfo: SingleEventModel;
  public stages: StagesModel;
  public tweets: TweetModel[] | TweetsModel;
  public mostRecentTweets: TweetModel[] = [];
  public mostPopularPersonsPeriod: MostPopularPersonModel[];
  public mostPopularPersonsRace: MostPopularPersonModel[];

  public isCurrentEvent: boolean;
  public isStagesListOpen: boolean = false;
  public isAllDataLoaded: boolean = false;

  private config: ConfigModel;

  constructor(private monitoringService: MonitoringService,
              private titleService: Title,
              private router: Router) {}

  @Input() public set capturedParams(params: { [ key: string ]: number } ) {
    this.eventID = params['eventID'];
    this.stageID = params['stageID'];

    if (!this.eventID) {
      this.router.navigateByUrl('/events');
    } else {
      this.getConfig();
      this.getEventInfo();
      this.getMostPopularPersons();
      this.getStages();

      this.getMostRecentTweets();
    }
  }

  public ngOnInit(): void {
    //
  }

  public toggleStagesList(): void {
    this.isStagesListOpen = !this.isStagesListOpen;
  }

  private getConfig(): void {
    this.monitoringService.getConfig().subscribe((config: ConfigModel) => {
      this.config = config;
      this.isCurrentEvent = this.checkIfCurrentEvent();
      this.getTweets();
    });
  }

  private getEventInfo(): void {
    this.monitoringService.getEventInfo(this.eventID).subscribe((eventInfo: SingleEventModel) => {
      this.eventInfo = eventInfo;
      this.titleService.setTitle(`Sport Monitoring | ${this.eventInfo.name}`);
      this.checkDataStatus();
    });
  }

  private getStages(): void {
    this.monitoringService.getStagesByEventID(this.eventID).subscribe((stages: StagesModel) => {
      this.stages = stages;
    });
  }

  private getTweets(): void {
    this.monitoringService.getTweets(this.eventID, this.stageID).subscribe(
      (tweets: TweetsModel | TweetModel[]) => {
        this.tweets = tweets;
        this.checkDataStatus();
      }
    );
  }

  private getMostPopularPersons(): void {
    this.monitoringService.getMostPopularPersons(
      this.isCurrentEvent,
      this.eventID,
      this.stageID
    ).subscribe((persons: MostPopularPersonsModel) => {
      this.mostPopularPersonsPeriod = persons.period;
      this.mostPopularPersonsRace = persons.race;
      this.checkDataStatus();
    });
  }

  private getMostRecentTweets(): void {
    this.monitoringService.getMostRecentTweets(this.eventID).subscribe(
      (mostRecentTweets: TweetModel[]) => {
        this.mostRecentTweets = mostRecentTweets;
        this.checkDataStatus();
      }
    );
  }

  private checkIfCurrentEvent(): boolean {
    for (const item of this.config.current) {
      if (this.eventID === item.raceId) {
        return true;
      }
    }

    return false;
  }

  private checkDataStatus(): void {
    if (
      this.eventInfo &&
      this.stages &&
      this.tweets &&
      this.mostRecentTweets &&
      this.mostPopularPersonsPeriod &&
      this.mostPopularPersonsRace
    ) {
      this.isAllDataLoaded = true;
    }
  }
}
