import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { SearchByTextComponent } from './search-by-text/search-by-text.component';
import { SearchNearByComponent } from './search-near-by/search-near-by.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    component: SearchByTextComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'nearby',
    component: SearchNearByComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'profile',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'automobile',
    loadChildren: () =>
      import('./automobile/automobile.module').then((m) => m.AutomobileModule),
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
