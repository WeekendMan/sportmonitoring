import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { TypedJSON } from 'typedjson-npm/src/typed-json';

import { ConfigModel } from '../models/config.model';
import { SingleEventModel } from '../models/single-event.model';
import { StageModel } from '../models/stage.model';
import { TweetModel } from '../models/tweet.model';
import { TweetsModel } from '../models/tweets.model';
import { MostPopularPersonModel } from '../models/most-popular-person.model';
import { MostPopularPersonsModel } from '../models/most-popular-persons.model';
import { StagesModel } from '../models/stages.model';

@Injectable()

export class MonitoringService {
  private static getValues(from: { [ key: number ]: any }, to: any[] = []): any[] {
    for (const item in from) {
      if (from.hasOwnProperty(item)) {
        to.push(from[item]);
      }
    }

    return to;
  }

  // private baseURL: string = 'http://178.159.110.25:5000/api/';
  private baseURL: string = 'http://sportmonitoring.info:5000/api/';
  private configURL: string = this.baseURL + 'config/';
  private stagesURL: string = this.baseURL + 'stage';
  private topTweetsURL: string = this.baseURL + 'top';
  private mostPopularPersonsURL: string = this.baseURL + 'table';
  private newestTweetsURL: string = this.baseURL + 'flood';
  private scheduleURL: string = this.baseURL + 'schedule';

  constructor(private http: Http) {}

  public getConfig(): Observable<ConfigModel> {
    return Observable.create((observer: Observer<ConfigModel>) => {
      this.sendGETRequest(this.configURL).subscribe(
        (response: Response) => {
          observer.next(TypedJSON.parse(response.json(), ConfigModel));
          observer.complete();
        },
        () => {
          observer.next(null);
          observer.complete();
        }
      );
    });
  }

  public getStagesByEventID(eventID: number, stageID?: number): Observable<StagesModel> {
    return Observable.create((observer: Observer<StagesModel>) => {
      this.sendGETRequest(`${this.stagesURL}/${eventID}`).subscribe(
        (response: Response) => {
          let stages: StagesModel;
          stages = {
            all: [],
            past: [],
            current: [],
            announcement: []
          };

          stages.all = MonitoringService.getValues(response.json())
                                        .map((res: any) => TypedJSON.parse(res, StageModel));
          for (let stage of stages.all) {
            if (stage.state === -1) {
              stages.past.push(stage);
            } else if (stage.state === 0) {
              stages.current.push(stage);
            } else if (stage.state === 1) {
              stages.announcement.push(stage);
            }
          }

          observer.next(stages);
          observer.complete();
        },
        () => {
          observer.next(null);
          observer.complete();
        }
      );
    });
  }

  public getTweets(
    eventID: number,
    stageID?: number
  ): Observable<TweetModel[] | TweetsModel> {
    return Observable.create((observer: Observer<TweetModel[] | TweetsModel>) => {
      this.sendGETRequest(`${this.topTweetsURL}/${eventID}/${stageID ? stageID + '/' : ''}`)
          .subscribe(
            (response: Response) => {
              if (response.json()['15min']) {
                observer.next(TypedJSON.parse(response.json(), TweetsModel));
              } else {
                observer.next(
                  MonitoringService.getValues(response.json())
                    .map((item: any) => TypedJSON.parse(item, TweetModel))
                );
              }

              observer.complete();
            },
            () => {
              observer.next(null);
              observer.complete();
            }
          );
    });
  }

  public getMostPopularPersons(
    isCurrentEvent: boolean,
    eventID: number,
    stageID?: number
  ):
  Observable<MostPopularPersonsModel> {
    return Observable.create((observer: Observer<MostPopularPersonsModel>) => {
      let persons: MostPopularPersonsModel;
      persons = {
        race: [],
        period: []
      };

      if (isCurrentEvent) {
        this.sendGETRequest(
          `${this.mostPopularPersonsURL}/${eventID}/${stageID ? stageID + '/' : ''}${stageID ? '?period=30' : ''}`
        ).subscribe((response: Response) => {
          persons.period = response.json()
            .map((res: any) => TypedJSON.parse(res, MostPopularPersonModel));

          if (persons.period && persons.race) {
            observer.next(persons);
            observer.complete();
          }
        });
      }
      this.sendGETRequest(
        `${this.mostPopularPersonsURL}/${eventID}/${stageID ? stageID + '/' : ''}?period=race`
      ).subscribe((response: Response) => {
        persons.race = response.json()
          .map((res: any) => TypedJSON.parse(res, MostPopularPersonModel));

        if (persons.period && persons.race) {
          observer.next(persons);
          observer.complete();
        }
      });
    });
  }

  public getMostRecentTweets(eventID: number, limit: number = 3): Observable<TweetModel[]> {
    return Observable.create((observer: Observer<TweetModel[]>) => {
      this.sendGETRequest(`${this.newestTweetsURL}/${eventID}/`)
          .subscribe(
            (response: Response) => {
              const json = response.json();

              observer.next(
                json
                  .map((res: any) => TypedJSON.parse(res, TweetModel))
                  .splice(0, limit)
              );

              observer.complete();
            },
            (error: Response) => {
              observer.error(error.text());
            }
          );
    });
  }

  public getScheduleList(periods?: number[]): Observable<SingleEventModel[]> {
    return Observable.create((observer: Observer<SingleEventModel[]>) => {
      this.sendGETRequest(this.scheduleURL + (periods ? '?time=' + periods.join(',') : ''))
          .subscribe(
            (response: Response) => {
              observer.next(
                response.json().map((res: any) => TypedJSON.parse(res, SingleEventModel))
              );
              observer.complete();
            },
            (error: Response) => {
              observer.error(error.text());
            });
    });
  }

  public getEventInfo(eventID: number): Observable<SingleEventModel> {
    return Observable.create((observer: Observer<SingleEventModel>) => {
      this.sendGETRequest(`${this.scheduleURL}/${eventID}/`)
          .subscribe(
            (response: Response) => {
              observer.next(
                response.json().map((res: any) => TypedJSON.parse(res, SingleEventModel))[0]
              );
              observer.complete();
            },
            (error: Response) => {
              observer.error(error.text());
            }
          );
    });
  }

  private sendGETRequest(url: string) {
    return this.http.get(url);
  }
}
