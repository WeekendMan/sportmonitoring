import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EventComponent } from './event.component';
import { TweetsComponent } from './tweets/tweets.component';
import { TweetComponent } from './tweet/tweet.component';
import { MostRecentComponent } from './most-recent/most-recent.component';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { MostPopularStageComponent } from './most-popular-stage/most-popular-stage.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    EventComponent,
    TweetsComponent,
    TweetComponent,
    MostRecentComponent,
    MostPopularComponent,
    MostPopularStageComponent
  ],
  exports: [
    EventComponent,
    TweetsComponent,
    TweetComponent,
    MostRecentComponent,
    MostPopularComponent,
    MostPopularStageComponent
  ]
})

export class EventModule {}
