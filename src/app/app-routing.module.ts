import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { AuthGuard } from './guards/auth.guards';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'contact', canActivate: [AuthGuard], component: ContactComponent },
  { path: 'contacts', canActivate: [AuthGuard], component: ContactsComponent },
  { path: 'add-contact', canActivate: [AuthGuard], component: AddContactComponent },
  { path: 'edit-profile', canActivate: [AuthGuard], component: EditProfileComponent },
  { path: 'edit-contact', canActivate: [AuthGuard], component: EditContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
