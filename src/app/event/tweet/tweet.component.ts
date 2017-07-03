import { Component, Input } from '@angular/core';
import { TweetModel } from '../../../common/models/tweet.model';

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: [ './tweet.component.css', '../common-tmp/common-styles.css' ]
})

export class TweetComponent {
  @Input() public tweet: TweetModel;
  @Input() public currentLabel: string;
}
