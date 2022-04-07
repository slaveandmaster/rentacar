import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
},
  { path: '', 
  loadChildren: () => import('./features/auth/auth.module').then(m=>m.AuthModule)},
  { path: 'dashboard', 
  loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '', 
  loadChildren: () => import('./pages/cars/cars.module').then(m => m.CarsModule) },
{
    path: 'home',
    component: HomeComponent
},
{
    path: '**',
    component: PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
