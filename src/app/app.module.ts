import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule  } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ListsComponent } from './components/lists/lists.component';
import { ProfileComponent } from './components/profile/profile.component'; 
import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { LoginErrorComponent } from './components/login-error/login-error.component';
import { NewListComponent } from './components/new-list/new-list.component';
import { ViewListComponent } from './components/view-list/view-list.component';
import { JoinListComponent } from './components/join-list/join-list.component';
import { TaskIsCompletedPipe } from './pipes/task-is-completed.pipe';
import { AddListItemComponent } from './components/add-list-item/add-list-item.component';
import { EditListItemComponent } from './components/edit-list-item/edit-list-item.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    SignupComponent,
    SidenavComponent,
    ListsComponent,
    ProfileComponent,
    LoginErrorComponent,
    NewListComponent,
    ViewListComponent,
    JoinListComponent,
    TaskIsCompletedPipe,
    AddListItemComponent,
    EditListItemComponent,
    DeleteDialogComponent
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatToolbarModule, 
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClipboardModule,
  ], 
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
