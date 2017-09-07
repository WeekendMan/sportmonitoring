import { Component } from '@angular/core';

@Component({
  selector: 'footer-block',
  template: `
    <footer>
      <div class="top">Questions? Ideas? Proposals?</div>
      <div class="bottom">Contact us:
        <a
          mailto="mail@sportmonitoring.info"
          title="contact us"
        >mail@sportmonitoring.info</a>
      </div>
    </footer>
  `,
  styles: [`
    footer {position: absolute; right: 0; bottom: 0; left: 0; width: 1320px; height: 80px; margin: auto;}
    div {text-align: center; color: #fff;}
    .top {font: bold 26px/40px OpenSans;}
    .bottom {font: normal 20px/40px OpenSans;}
  `]
})

export class FooterComponent {}
