import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { ENV_PROVIDERS } from './environment';

import { ROUTES } from './app.routes';

import '../styles/headings.css';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PartnersComponent } from './partners/partners.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PartnersComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ENV_PROVIDERS
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
