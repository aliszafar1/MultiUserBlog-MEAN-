import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlashMessagesModule } from 'angular2-flash-messages';
// import { WebStorageModule, LocalStorageService } from 'angular2-localstorage';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { RouterModule } from '@angular/router';

import { AppRoutes } from './app.routes';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogComponent } from './components/blog/blog.component';
import { AddPostComponent } from './components/addPost/addPost.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

import { Components } from './components';

import { AppService } from './services/app.services';
import { AuthGuardService } from './authGuard';

const myFirebaseConfig = {
    apiKey: "AIzaSyABKFPsTWLQySuaLFapLCI7U3Imx7fZotA",
    authDomain: "project1-173ce.firebaseapp.com",
    databaseURL: "https://project1-173ce.firebaseio.com",
    projectId: "project1-173ce",
    storageBucket: "project1-173ce.appspot.com",
    messagingSenderId: "261610909931"
};

// const myFirebaseAuthConfig = {
//   provider: AuthProviders.Password,
//   method: AuthMethods.Password
// };

@NgModule({
  imports: [ BrowserModule
            , HttpModule
            , RouterModule.forRoot(AppRoutes)
            , FormsModule
            , ReactiveFormsModule
            , FlashMessagesModule
            // , WebStorageModule
            , AngularFireModule.initializeApp(myFirebaseConfig)
    ],
  declarations: [ AppComponent
                , DashboardComponent
                , BlogComponent
                , AddPostComponent
                , SignupComponent
                , SigninComponent
                ],
  providers: [  AppService
              , AuthGuardService
              // , LocalStorageService
               ],
  bootstrap: [AppComponent]
})
export class AppModule { }
