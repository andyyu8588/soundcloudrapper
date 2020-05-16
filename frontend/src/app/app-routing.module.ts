import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { loginComponent } from './components/header/loginpage/loginpage.component';
import { registrationComponent} from './components/header/registrationpage/registrationpage.component'
import { ProfileComponent } from './components/header/profile/profile.component';

const routes: Routes = [
  {path: 'login', component: loginComponent},
  {path: 'register', component: registrationComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
