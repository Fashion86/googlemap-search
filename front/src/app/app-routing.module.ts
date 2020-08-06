import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UnitComponent } from './components/unit/unit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'unit', component: UnitComponent },
    { // Default
          path: '',
          redirectTo: '/home',
          pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
