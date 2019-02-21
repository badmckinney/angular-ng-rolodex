import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'edit-contact', component: EditContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
