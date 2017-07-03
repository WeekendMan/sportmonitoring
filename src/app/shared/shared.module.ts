import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrepareNumericDatePipe } from '../../common/pipes/prepare-numeric-date.pipe';
import { PrepareSymbolicDatePipe } from '../../common/pipes/prepare-symbolic-date.pipe';
import { ReplaceLineBreaksPipe } from '../../common/pipes/replace-line-breaks.pipe';
import { ActiveURLsPipe } from '../../common/pipes/active-urls.pipe';
import { MetatagsPipe } from '../../common/pipes/metatags.pipe';
import { SafeHTMLPipe } from '../../common/pipes/safeHTML.pipe';
import { KeysPipe } from '../../common/pipes/keys.pipe';

import { LoadingStubComponent } from './loading-stub/loading-stub.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    PrepareNumericDatePipe,
    PrepareSymbolicDatePipe,
    KeysPipe,
    SafeHTMLPipe,
    MetatagsPipe,
    ActiveURLsPipe,
    ReplaceLineBreaksPipe,
    LoadingStubComponent
  ],
  exports: [
    PrepareNumericDatePipe,
    PrepareSymbolicDatePipe,
    KeysPipe,
    SafeHTMLPipe,
    MetatagsPipe,
    ActiveURLsPipe,
    ReplaceLineBreaksPipe,
    LoadingStubComponent
  ]
})

export class SharedModule {}
