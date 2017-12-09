import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { HomeComponent } from './home.component';

const routes: Routes = Route.withShell([
  { path: '', redirectTo: '/play', pathMatch: 'full' },
  { path: 'play', component: HomeComponent, data: { title: extract('Play Game') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
