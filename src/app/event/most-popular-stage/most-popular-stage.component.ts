import { Component, Input } from '@angular/core';
import { MostPopularPersonModel } from '../../../common/models/most-popular-person.model';

@Component({
  selector: 'most-popular-stage',
  templateUrl: '../common-tmp/most-popular/most-popular.component.html',
  styleUrls: [
    '../common-tmp/most-popular/most-popular.component.css',
    '../common-tmp/common-styles.css'
  ]
})

export class MostPopularStageComponent {
  @Input() public persons: MostPopularPersonModel[];
  @Input() public isStage: boolean;
}
