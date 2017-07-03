import { Component, Input } from '@angular/core';
import { TweetModel } from '../../../common/models/tweet.model';

@Component({
  selector: 'most-recent',
  templateUrl: './most-recent.component.html',
  styleUrls: [ './most-recent.component.css', '../common-tmp/common-styles.css' ]
})

export class MostRecentComponent {
  @Input() public mostRecent: TweetModel[];
}
