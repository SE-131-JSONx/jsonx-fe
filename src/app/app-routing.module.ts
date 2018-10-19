import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CanActivateViaAuthGuard } from './guards/can-activate-via-auth.guard';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { MyJsonComponent } from './components/my-json/my-json.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateViaAuthGuard]},
  { path: 'myprofile', component: MyprofileComponent, canActivate: [CanActivateViaAuthGuard]},
  { path: 'json', component: MyJsonComponent, canActivate: [CanActivateViaAuthGuard]},
  { path: 'explorer', component: ExplorerComponent, canActivate: [CanActivateViaAuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
