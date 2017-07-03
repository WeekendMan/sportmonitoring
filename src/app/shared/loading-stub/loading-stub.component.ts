import { Component } from '@angular/core';

@Component({
  selector: 'loading-stub',
  template: `
    <div class="loadingStub">
      <span>Loading...</span>    
    </div>
  `,
  styles: [`
    div {
      animation: fadeIn .5s 1 ease-in-out;
      width: 1320px;
      margin: 0 auto;
      text-align: center;
    }
    span {
      display: inline-block;
      height: 50px;
      padding-left: 50px;
      color: #fff;
      font: normal 25px/47px OpenSans, sans-serif;
      background: url(../../../assets/img/spinner.gif) no-repeat 15px center;
      background-size: 22px;
    }
  `]
})

export class LoadingStubComponent {}
