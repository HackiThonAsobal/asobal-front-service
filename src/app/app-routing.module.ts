import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  
  { path: '', redirectTo: '/asobal', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'asobal', component: ProfileComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
