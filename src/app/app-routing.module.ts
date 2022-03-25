import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { JoinListComponent } from './components/join-list/join-list.component';
import { ListsComponent } from './components/lists/lists.component';
import { LoginErrorComponent } from './components/login-error/login-error.component';
import { NewListComponent } from './components/new-list/new-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewListComponent } from './components/view-list/view-list.component';
import { TokenGuard } from './guards/token.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'upss', component: LoginErrorComponent },
  { path: 'app', component: SidenavComponent, canActivate: [TokenGuard],
    children: [
      {
        path: 'home', // child route path
        component: HomeComponent, // child route component that the router renders
      },
      {
        path: 'lists',
        component: ListsComponent, // another child route component that the router renders 
      },
      {
        path:'lists/:listId', 
        component: ViewListComponent
      },
      {
        path: 'new-list',
        component: NewListComponent
      },
      {
        path: 'join-list',
        component: JoinListComponent
      },
      {
        path: 'profile',
        component: ProfileComponent, // another child route component that the router renders
      }, 
      { path: '**', component: HomeComponent }
    ], 
  }, 
  { path: '**', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
