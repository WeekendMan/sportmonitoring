import { Routes } from '@angular/router';
import { PartnersComponent } from './partners/partners.component';

export const ROUTES: Routes = [
  { path: '', loadChildren: './+main-page#MainPageModule' },
  { path: 'events', loadChildren: './+events#EventsModule'},
  { path: 'partners', component: PartnersComponent },
  { path: '**', redirectTo: '/events' }
];
