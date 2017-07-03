import { Component, Input, OnInit } from '@angular/core';
import { TweetModel } from '../../../common/models/tweet.model';
import { TweetsModel } from '../../../common/models/tweets.model';

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: [ './tweets.component.css' ]
})

export class TweetsComponent implements OnInit {
  @Input() public tweets: TweetModel[] | TweetsModel;
  public isCurrentEvent: boolean;
  public currentEventTweetsOrder: string[] = [ '15min', 'hour', 'stage', 'top' ];
  public labels: { [ key: string ]: string } = {
    '15min': 'Tweet of the last 15 minutes',
    'hour': 'Tweet of the last hour',
    'stage': 'Tweet of the day',
    'top': 'The most popular tweet'
  };
  public mixedOrder: Array<string | number> = [];

  public ngOnInit(): void {
    if (this.tweets.constructor === TweetsModel) {
      this.mixedOrder = this.currentEventTweetsOrder;
      this.isCurrentEvent = true;
    } else {
      this.isCurrentEvent = false;
      for (let i = 0; i < Object.keys(this.tweets).length; i ++) {
        this.mixedOrder.push(i);
      }
    }
  }
}
