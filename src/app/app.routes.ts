import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', loadChildren: './+main-page#MainPageModule' },
  { path: 'events', loadChildren: './+events#EventsModule'},
  { path: '**', redirectTo: '/events' }
];
